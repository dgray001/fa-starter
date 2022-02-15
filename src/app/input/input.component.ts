import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { OpenBabelData } from '../OpenBabelData';
import { DataService } from '../submit.abstract.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  constructor(readonly service: DataService) {}
}
