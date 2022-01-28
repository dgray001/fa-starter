import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { InputData } from '../inputData';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  inputData: InputData = this.dataService.inputData;

  constructor(private readonly dataService: DataService) {}
}
