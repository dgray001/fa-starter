import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { OutputComponent } from './output.component';

describe('OutputComponent', () => {
  let component: OutputComponent;
  let fixture: ComponentFixture<OutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ FormsModule ],
      declarations: [ OutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update output string based on text in output textbox', async () => {
    await fixture.whenStable();
    const outputTextBox = fixture.debugElement.query(By.css('.outputTextBox')).nativeElement;

    outputTextBox.value = "Some output text";
    outputTextBox.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.outputString).toEqual("Some output text");
  });
});
