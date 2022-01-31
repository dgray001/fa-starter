import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { startWith, shareReplay } from 'rxjs/operators';

import { InputData } from './inputData';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  inputData: InputData = { input: "", inputFormat: "", outputFormat: "", additionalOptions: "" };

  constructor() {}
}
