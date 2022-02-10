import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, from, OperatorFunction, pipe } from 'rxjs';
import { mergeMap, catchError, tap, shareReplay, withLatestFrom } from 'rxjs/operators';
import { OpenBabelData } from './OpenBabelData';

@Injectable({
  providedIn: 'root'
})
export class MockSubmitService {
  private readonly submitUrl: string = "/submit/";
  private readonly blankData: OpenBabelData = {inputString: "", inputFormat: "", outputFormat: "",
    additionalOptions: ""};
  outputSubject: BehaviorSubject<OpenBabelData> = new BehaviorSubject(this.blankData);
  data$: Observable<OpenBabelData> = from(this.outputSubject).pipe(
    shareReplay(1)
  );

  constructor(private readonly http: HttpClient) {}

  submit(): OperatorFunction<boolean, any> {
    return pipe(
      withLatestFrom(this.data$),
      tap(([_, data]) => {
        data['output'] = "test obabel output";
        this.outputSubject.next(data);
      })
    );
  }
}
