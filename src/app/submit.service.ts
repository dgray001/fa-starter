import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, from, OperatorFunction, pipe } from 'rxjs';
import { mergeMap, tap, shareReplay, withLatestFrom } from 'rxjs/operators';
import { OpenBabelData } from './OpenBabelData';

@Injectable({
  providedIn: 'root'
})
export class SubmitService {
  readonly submitUrl: string = "/submit/";
  blankData: OpenBabelData = {inputString: "", inputFormat: "", outputFormat: "",
    additionalOptions: ""};
  outputSubject: BehaviorSubject<OpenBabelData> = new BehaviorSubject(this.blankData);
  data$: Observable<OpenBabelData> = from(this.outputSubject).pipe(
    shareReplay(1)
  );

  constructor(private readonly http: HttpClient) {}

  submit(): OperatorFunction<boolean, any> {
    return pipe(
      withLatestFrom(this.data$),
      mergeMap(([_, data]) => this.http.patch<OpenBabelData>(this.submitUrl, data).pipe(
        tap((result) => this.outputSubject.next(result))
      ))
    );
  }
}
