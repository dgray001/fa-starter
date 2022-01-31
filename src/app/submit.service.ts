import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OpenBabelData } from './OpenBabelData';

@Injectable({
  providedIn: 'root'
})
export class SubmitService {
  readonly submitUrl: string = "/submit";
  data: OpenBabelData = {inputString: "", inputFormat: "", outputFormat: "",
    additionalOptions: ""};

  constructor(private readonly http: HttpClient) {}

  submit(): Observable<OpenBabelData> {
    return this.http.patch<OpenBabelData>(this.submitUrl, this.data);
  }
}
