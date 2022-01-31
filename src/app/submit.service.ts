import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { OpenBabelData } from './OpenBabelData';

@Injectable({
  providedIn: 'root'
})
export class SubmitService {
  readonly submitUrl: string = "/example/ping";
  data: OpenBabelData = {inputString: "", inputFormat: "", outputFormat: "",
    additionalOptions: ""};

  constructor(private readonly http: HttpClient) {}

  submit(): Observable<String> {
    return this.http.patch<String>(this.submitUrl, this.data.inputString);
  }
}
