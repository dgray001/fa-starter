import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { OpenBabelData } from '../OpenBabelData';
import { DataService } from '../submit.abstract.service';
import { CodeMirrorConfig } from '../codemirror.options';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent {
  CodeMirrorConfig = CodeMirrorConfig;
  constructor(readonly service: DataService) {}
}
