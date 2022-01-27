import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  inputFormat$: Observable<String> = of("");
  outputFormat$: Observable<String> = of("");

  constructor() {}
}
