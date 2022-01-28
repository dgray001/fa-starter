import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { startWith, shareReplay } from 'rxjs/operators';

import { InputData } from './inputData';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  inputData: InputData = { input: "", inputFormat: "", outputFormat: "", additionalOptions: "" };
  output: BehaviorSubject<String>= new BehaviorSubject<String>("");

  constructor() {}

  submit(): void {
    let inputDisplay: String = this.inputData.input.length > 8 ?
      this.inputData.input.substring(0, 4) + "..." : this.inputData.input;
    let inputFormat: String = this.inputData.inputFormat.split('--')[0].trim();
    let outputFormat: String = this.inputData.outputFormat.split('--')[0].trim();
    this.output.next(inputDisplay + "\n -i " + inputFormat + " -o " + outputFormat +
      " " + this.inputData.additionalOptions);
  }
}
