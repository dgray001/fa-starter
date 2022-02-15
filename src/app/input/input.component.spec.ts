import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { OpenBabelData } from '../OpenBabelData';
import { InputComponent } from './input.component';
import { DataService } from '../submit.abstract.service';
import { MockSubmitService } from '../submit.mock.service';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let loader: HarnessLoader;
  let service: MockSubmitService;
  const blankData: OpenBabelData = {inputString: "",
    inputFormat: "", outputFormat: "", additionalOptions: ""};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ InputComponent ],
      providers: [ InputComponent, { provide: DataService, useClass: MockSubmitService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(DataService);
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update data$ observable from input in input box', async () => {
    await fixture.whenStable();
    const inputHarness = await loader.getHarness(MatInputHarness.with(
      {selector: '.inputTextBox'}));
    service.data$.subscribe(
      data => expect(data['inputString']).toEqual("")
    );

    await inputHarness.setValue("Some input text");

    service.data$.subscribe(
      data => expect(data['inputString']).toEqual("Some input text")
    );
  });
});
