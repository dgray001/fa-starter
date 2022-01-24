import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FORMATS } from '../formatlist';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  formats: String[] = FORMATS;
  //currentList: Observable<String[]> =

  constructor() { }

  ngOnInit(): void {
  }

}
