import { Component, OnInit } from '@angular/core';
import { SubmitService } from '../submit.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  inputString: string = "";

  constructor(private readonly service: SubmitService) {}

  ngOnInit(): void {}

}
