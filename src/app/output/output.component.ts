import { Component } from '@angular/core';
import { Observable, from } from 'rxjs';

import { DataService } from '../data.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent {
  outputString$: Obesrvable<String> = this.dataService.ouput;

  constructor(private readonly dataService: DataService) {}
}
