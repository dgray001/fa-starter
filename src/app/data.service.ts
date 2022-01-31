import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { startWith, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { InputData } from './inputData';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  inputData: InputData = { input: "", inputFormat: "", outputFormat: "", additionalOptions: "" };
  output: BehaviorSubject<String>= new BehaviorSubject<String>("");

  constructor(private readonly http: HttpClient) {}

  submit(): Observable<any> {
    let inputString: String = "test";
    return this.http.patch('../submit', inputString);
  }
}
