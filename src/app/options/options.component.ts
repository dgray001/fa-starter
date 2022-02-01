import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable, fromEvent, of, concat } from 'rxjs';
import { map, startWith, mergeMap, mapTo, tap } from 'rxjs/operators';

import { OpenBabelData } from '../OpenBabelData';
import { FORMATS } from '../formatlist';
import { SubmitService } from '../submit.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements AfterViewInit{
  formats: String[] = FORMATS;
  data$: Observable<OpenBabelData> = this.service.data$;
  inputControl = new FormControl('', [Validators.required, validateFormat]);
  inputList: Observable<String[]> = this.inputControl.valueChanges.pipe(
    startWith(""),
    map(value => {
      return this.formats.filter(format => {
        return format.toLowerCase().includes(value.toLowerCase())
          && !format.toLowerCase().includes("write");
      });
    })
  );
  outputControl = new FormControl('', [Validators.required, validateFormat]);
  outputList: Observable<String[]> = this.outputControl.valueChanges.pipe(
    startWith(""),
    map(value => {
      return this.formats.filter(format => {
        return format.toLowerCase().includes(value.toLowerCase())
          && !format.toLowerCase().includes("read");
      });
    }),
  );
  additionalOptions: String = this.service.data.additionalOptions;
  submit$: Observable<boolean> = of(false);
  @ViewChild('submitButton', {read: ElementRef}) submitButton: ElementRef;

  constructor(private readonly service: SubmitService) {}

  ngAfterViewInit() {
    this.submit$ = fromEvent(this.submitButton.nativeElement, 'click').pipe(
      mergeMap(() => {
        return concat(
          of(true),
          of(true).pipe(
            mergeMap(() => this.service.submit()), mapTo(false)
          )
        )
      }), startWith(false)
    );
  }
}

function validateFormat(control: AbstractControl): {[key: string]: any} | null {
  if (!FORMATS.includes(control.value)) {
    return {invalidFormat: true};
  }
  return null;
}
