import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { InputComponent } from './input/input.component';
import { OutputComponent } from './output/output.component';
import { OptionsComponent } from './options/options.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';
}
