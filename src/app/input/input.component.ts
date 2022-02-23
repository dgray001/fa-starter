import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable, Observer, fromEvent, of, concat, pipe, OperatorFunction } from 'rxjs';
import { mergeMap, map, tap, startWith, withLatestFrom } from 'rxjs/operators';

import { FORMATS } from '../formatlist';
import { OpenBabelData } from '../OpenBabelData';
import { DataService } from '../submit.abstract.service';
import { CodeMirrorConfig } from '../codemirror.options';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements AfterViewInit {
  CodeMirrorConfig = CodeMirrorConfig;
  maxFileSize: number = 30000;
  message$: Observable<string>;
  uploadingFile$: Observable<boolean> = of(false);
  @ViewChild('fileInput', {read: ElementRef}) fileInput: ElementRef;

  constructor(readonly service: DataService) {}

  ngAfterViewInit() {
    this.uploadingFile$ = fromEvent(this.fileInput.nativeElement, 'change').pipe(
      mergeMap((event) => {
        return concat(
          of(true),
          of(true).pipe(this.uploadFiles(event), map((message) => {
            if (message.includes("uploading")) {
              return true;
            }
            return false;
          })),
        );
      }), startWith(false)
    );
  }

  uploadFiles(event): OperatorFunction<any, any> {
    return pipe(
      withLatestFrom(this.service.data$),
      mergeMap(([_, data]) => {
        return new Observable((observer: Observer<string>) => {
          const files = event?.target?.files;
          if (files == null || files.length == 0) {
            observer.next("No file uploaded");
          }
          else {
            if (files.length > 1) {
              observer.next("Cannot upload multiple files");
            }
            else if (files[0].size > this.maxFileSize) {
              observer.next(files[0].name + " too large (max " + this.maxFileSize/1000 + " kb)");
            }
            else {
              observer.next("uploading " + files[0].name);
              const reader = new FileReader();
              let text = "";
              reader.onload = function(e) {
                text = (e?.target?.result)?.toString() || "";
                if (text != "") {
                  data['inputString'] = text;
                }
                observer.next("uploaded " + files[0].name);
                const extension = files[0].name.split('.')[files[0].name.split('.').length - 1];
                for (let i in FORMATS) {
                  if (extension === FORMATS[i].split('--')[0].trim()) {
                    data['inputFormat'] = FORMATS[i];
                    break;
                  }
                }
              };
              reader.readAsText(files[0]);
            }
          }
        }).pipe(
          tap((result) => this.message$ = of(result)),
        );
      }),
    );
  }
}
