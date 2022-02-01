import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from '../submit.abstract.service';
import { OpenBabelData } from '../OpenBabelData';
import { SubmitService } from '../submit.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  constructor(readonly service: DataService) {}
}
