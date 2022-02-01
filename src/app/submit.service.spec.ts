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

    expect(output.inputString).toEqual("CCCCOc1ccccc1");
    expect(output.inputFormat).toEqual("SMI");
    expect(output.outputFormat).toEqual("MOL");
    expect(output.additionalOptions).toEqual("--gen2D");
    expect(output.output).toEqual(`
       OpenBabel02012223112D

       11 11  0  0  0  0  0  0  0  0999 V2000
          4.3301   -1.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
          4.3301   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
          3.4641    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
          2.5981   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
          1.7321   -0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
          0.8660   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
          0.8660   -1.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
          0.0000   -2.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
         -0.8660   -1.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
         -0.8660   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
         -0.0000   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
        1  2  1  0  0  0  0
        2  3  1  0  0  0  0
        3  4  1  0  0  0  0
        4  5  1  0  0  0  0
        5  6  1  0  0  0  0
        6 11  1  0  0  0  0
        6  7  2  0  0  0  0
        7  8  1  0  0  0  0
        8  9  2  0  0  0  0
        9 10  1  0  0  0  0
       10 11  2  0  0  0  0
      M  END
      `);
  });
});
