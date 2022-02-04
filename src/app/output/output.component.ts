import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { OpenBabelData } from '../OpenBabelData';
import { SubmitService } from '../submit.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent {
  data$: Observable<OpenBabelData> = this.service.data$;

  constructor(private readonly service: SubmitService) {}

}
