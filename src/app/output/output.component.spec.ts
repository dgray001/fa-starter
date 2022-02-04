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

describe('OutputComponent', () => {
  let component: OutputComponent;
  let fixture: ComponentFixture<OutputComponent>;
  let loader: HarnessLoader;
  const mockData: Observable<OpenBabelData> = of({inputString: "CCCCOc1ccccc1",
    inputFormat: "SMI", outputFormat: "MOL", additionalOptions: "--gen2D",
    output: "Some output text"});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ OutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
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
    component.data$ = mockData;

    const outputString = await outputHarness.getValue();

    expect(outputString).toEqual("Some output text");
  });
});
