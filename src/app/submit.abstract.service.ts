import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, from, OperatorFunction, pipe } from 'rxjs';
import { mergeMap, catchError, tap, shareReplay, withLatestFrom } from 'rxjs/operators';
import { OpenBabelData } from './OpenBabelData';

@Injectable({
  providedIn: 'root'
})
export abstract class DataService {
  private readonly submitUrl: string = "/submit/";
  private readonly blankData: OpenBabelData = {inputString: "", inputFormat: "", outputFormat: "",
    additionalOptions: ""};
  outputSubject: BehaviorSubject<OpenBabelData> = new BehaviorSubject(this.blankData);
  data$: Observable<OpenBabelData> = from(this.outputSubject).pipe(
    shareReplay(1)
  );

  constructor(readonly http: HttpClient) {}

  getSubmitUrl(): string {
    return this.submitUrl;
  }
  getBlankData(): OpenBabelData {
    return this.blankData;
  }

  abstract submit(): OperatorFunction<boolean, any>;
}
