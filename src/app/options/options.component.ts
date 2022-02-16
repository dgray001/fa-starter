import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable, fromEvent, of, concat } from 'rxjs';
import { map, startWith, mergeMap, mapTo, tap, merge, withLatestFrom } from 'rxjs/operators';

import { OpenBabelData } from '../OpenBabelData';
import { FORMATS } from '../formatlist';
import { DataService } from '../submit.abstract.service';
import { SubmitService } from '../submit.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements AfterViewInit {
  formats: String[] = FORMATS;
  inputControl = new FormControl('', [Validators.required, validateFormat(this.formats)]);
  inputList: Observable<String[]> = this.inputControl.valueChanges.pipe(
    startWith(""),
    map(value => {
      return this.formats.filter(format => {
        return format.toLowerCase().includes(value.toLowerCase())
          && !format.toLowerCase().includes("write");
      });
    })
  );
  outputControl = new FormControl('', [Validators.required, validateFormat(this.formats)]);
  outputList: Observable<String[]> = this.outputControl.valueChanges.pipe(
    startWith(""),
    map(value => {
      return this.formats.filter(format => {
        return format.toLowerCase().includes(value.toLowerCase())
          && !format.toLowerCase().includes("read");
      });
    }),
  );
  submitting$: Observable<boolean> = of(false);
  disabled$: Observable<boolean> = of(true);
  @ViewChild('submitButton', {read: ElementRef}) submitButton: ElementRef;

  constructor(readonly service: DataService) {}

  ngAfterViewInit() {
    this.submitting$ = fromEvent(this.submitButton.nativeElement, 'click').pipe(
      mergeMap(() => {
        return concat(
          of(true),
          of(true).pipe(this.service.submit(), mapTo(false))
        );
      }), startWith(false)
    );
    this.disabled$ = this.submitting$.pipe(
      merge(this.inputControl.valueChanges, this.outputControl.valueChanges),
      withLatestFrom(this.submitting$),
      map(([_, submitting]) => {
        if (this.inputControl.invalid || this.outputControl.invalid || submitting) {
          return true;
        }
        return false;
      })
    );
  }
}

function validateFormat(validFormats: String[]) {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (!validFormats.includes(control.value)) {
      return {invalidFormat: true};
    }
    return null;
  };
}
