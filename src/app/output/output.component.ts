import { Component, OnInit } from '@angular/core';
import { SubmitService } from '../submit.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {
  outputString: string = "";

  constructor(private readonly service: SubmitService) {}

  ngOnInit(): void {}

}
