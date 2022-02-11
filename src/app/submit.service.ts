import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, from, OperatorFunction, pipe } from 'rxjs';
import { mergeMap, catchError, tap, shareReplay, withLatestFrom } from 'rxjs/operators';

import { DataService } from './submit.abstract.service';
import { OpenBabelData } from './OpenBabelData';

@Injectable({
  providedIn: 'root'
})
export class SubmitService extends DataService {

  constructor(http: HttpClient) {
    super(http);
  }

  submit(): OperatorFunction<boolean, any> {
    return pipe(
      withLatestFrom(this.data$),
      mergeMap(([_, data]) => this.http.patch<OpenBabelData>(this.getSubmitUrl(), data).pipe(
        tap((result) => this.outputSubject.next(result))
      )),
      catchError(this.handleError<OpenBabelData>('submit', this.getBlankData()))
    );
  }

  // Catch any http errors thrown by HttpClient
  private handleError<T>(operation = 'operation', result: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result);
    }
  }
}
