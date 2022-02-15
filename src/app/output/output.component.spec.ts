import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';

import { OpenBabelData } from '../OpenBabelData';
import { OutputComponent } from './output.component';
import { DataService } from '../submit.abstract.service';
import { MockSubmitService } from '../submit.mock.service';

describe('OutputComponent', () => {
  let component: OutputComponent;
  let fixture: ComponentFixture<OutputComponent>;
  let loader: HarnessLoader;
  let service: MockSubmitService;
  const mockData: Observable<OpenBabelData> = of({inputString: "CCCCOc1ccccc1",
    inputFormat: "SMI", outputFormat: "MOL", additionalOptions: "--gen2D",
    output: "Some output text"});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ OutputComponent ],
      providers: [ OutputComponent, { provide: DataService, useClass: MockSubmitService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(DataService);
    fixture = TestBed.createComponent(OutputComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update output string based on data$ observable', async () => {
    await fixture.whenStable();
    const outputHarness = await loader.getHarness(MatInputHarness.with(
      {selector: '.outputTextBox'}));
    service.data$ = mockData;

    const outputString = await outputHarness.getValue();

    expect(outputString).toEqual("Some output text");
  });
});
