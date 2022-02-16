import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, from, of } from 'rxjs';
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

  it('should update data$ with output data when submit() is called', async () => {
    await of(true).pipe(service.submit()).toPromise();

    service.data$.subscribe(
      value => {
        expect(value['output']).toEqual("test obabel output");
      }
    );
  });
});
