import { Component } from '@angular/core';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

import { FORMATS } from '../formatlist';
import { DataService } from '../data.service';
import { InputData } from '../inputData';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent {
  formats: String[] = FORMATS;
  inputData: InputData = this.dataService.inputData;
  inputControl = new FormControl('', [Validators.required, validateFormat]);
  inputFormat$: Observable<String> = this.dataService.inputFormat$;
  inputList$: Observable<String[]> = this.inputControl.valueChanges.pipe(
    startWith(""),
    map(value => {
      return this.formats.filter(format => {
        return format.toLowerCase().includes(value.toLowerCase())
          && !format.toLowerCase().includes("write");
      });
    })
  );
  outputControl = new FormControl('', [Validators.required, validateFormat]);
  outputFormat$: Observable<String> = this.dataService.outputFormat$;
  outputList$: Observable<String[]> = this.outputControl.valueChanges.pipe(
    startWith(""),
    map(value => {
      return this.formats.filter(format => {
        return format.toLowerCase().includes(value.toLowerCase())
          && !format.toLowerCase().includes("read");
      });
    }),
  );

  constructor(private readonly dataService: DataService) {}

  submit(): void {
    console.log(this.inputFormat$.subscribe())
  }
}

function validateFormat(control: AbstractControl): {[key: string]: any} | null {
  if (!FORMATS.includes(control.value)) {
    return {invalidFormat: true};
  }
  return null;
}
