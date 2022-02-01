import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { OpenBabelData } from '../OpenBabelData';
import { SubmitService } from '../submit.service';
import { OpenBabelData } from '../OpenBabelData';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  data$: Observable<OpenBabelData> = this.service.data$;

  constructor(private readonly service: SubmitService) {}
}
