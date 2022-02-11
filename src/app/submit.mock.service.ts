import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, from, OperatorFunction, pipe } from 'rxjs';
import { mergeMap, catchError, tap, shareReplay, withLatestFrom } from 'rxjs/operators';

import { DataService } from './submit.abstract.service';
import { OpenBabelData } from './OpenBabelData';

@Injectable({
  providedIn: 'root'
})
export class MockSubmitService extends DataService {

  constructor(http: HttpClient) {
    super(http);
  }

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
