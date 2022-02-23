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
    const outputTextbox = fixture.debugElement.query(By.css('.outputTextBox')).nativeElement;

    service.data$.subscribe(
      data => expect(data['output']).toBeFalsy()
    );

    outputTextbox.value = "Some output text";
    outputTextbox.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    service.data$.subscribe(
      data => expect(data['output']).toEqual("Some output text")
    );
  });
});
