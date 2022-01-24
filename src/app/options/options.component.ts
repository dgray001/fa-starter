import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FORMATS } from '../formatlist';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  formats: String[] = FORMATS;
  inputControl = new FormControl('', [Validators.required, validateFormat]);
  inputList: Observable<String[]> = this.inputControl.valueChanges.pipe(
    map(value => {
      return this.formats.filter(format => {
        return format.toLowerCase().includes(value.toLowerCase())
          && !format.includes("Write-only");
      });
    }),
    startWith(this.formats)
  );
  outputControl = new FormControl('', [Validators.required, validateFormat]);
  outputList: Observable<String[]> = this.outputControl.valueChanges.pipe(
    map(value => {
      return this.formats.filter(format => {
        return format.toLowerCase().includes(value.toLowerCase())
          && !format.includes("Read-only");
      });
    }),
    startWith(this.formats)
  );

  constructor() { }

  ngOnInit(): void {
  }

}

function validateFormat(control: AbstractControl): {[key: string]: any} | null {
  if (!FORMATS.includes(control.value)) {
    return {invalidFormat: true};
  }
  return null;
}
