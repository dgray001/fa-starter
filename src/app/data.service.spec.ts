import { TestBed } from '@angular/core/testing';
import { Observable, from } from 'rxjs';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send reformatted input to output when submit() is called', async () => {
    service.inputData.input = "test";
    let mockOutputComponent: Observable<String> = from(service.output);

    service.submit();

    expect("test").toEqual("test");
  });
});
