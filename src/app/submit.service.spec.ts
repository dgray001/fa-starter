import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { OpenBabelData } from './OpenBabelData';
import { MockSubmitService } from './submit.mock.service';

describe('MockSubmitService', () => {
  let service: MockSubmitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MockSubmitService]
    });
    service = TestBed.inject(MockSubmitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return of type OpenBabelData when submit() is called', async () => {
    let output;

    await service.submit().pipe(
      tap((data) => output = data)
    ).toPromise();

    expect(output.inputString).toBeInstanceOf(String);
    expect(output.inputFormat).toBeInstanceOf(String);
    expect(output.outputFormat).toBeInstanceOf(String);
    expect(output.additionalOptions).toBeInstanceOf(String);
    expect(output.output).toBeInstanceOf(String);
  });
});
