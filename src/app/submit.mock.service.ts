import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { OpenBabelData } from './OpenBabelData';

@Injectable({
  providedIn: 'root'
})
export class SubmitService {
  readonly submitUrl: String = "/submit/";
  data: OpenBabelData = {inputString: "", inputFormat: "", outputFormat: "",
    additionalOptions: ""};

  constructor(private readonly http: HttpClient) {}

  submit(): Observable<OpenBabelData> {
    let mockData:OpenBabelData = {inputString: "CCCCOc1ccccc1", inputFormat: "SMI",
      outputFormat: "MOL", additionalOptions: "--gen2D", output: "
       OpenBabel02012200392D

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
      "};
    return
  }
}
