import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { OpenBabelData } from '../OpenBabelData';
import { DataService } from '../submit.abstract.service';
import { CodeMirrorConfig } from '../codemirror.options';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  CodeMirrorConfig = CodeMirrorConfig;
  constructor(readonly service: DataService) {}
}
