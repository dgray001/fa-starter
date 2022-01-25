import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { OptionsComponent } from './options.component';

describe('OptionsComponent', () => {
  let component: OptionsComponent;
  let fixture: ComponentFixture<OptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ OptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsComponent);
    component = fixture.componentInstance;
    component.formats = [ "test1", "test2 [Read-only]", "test3 [Write-only]" ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter out write-only results from input drop-down list', async () => {
    await fixture.whenStable();
    const input = fixture.debugElement.query(By.css('.inputAutocomplete')).nativeElement;

    expect(input.innerText).toEqual(" test1 test2 [Read-only]");
  });

  it('should filter results for input drowdown list based on input', async () => {
    await fixture.whenStable();
    const inputInput = fixture.debugElement.query(By.css('.inputInput')).nativeElement;

    inputInput.value = "1";
    inputInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('.inputAutocomplete')).nativeElement;

    expect(input.innerText).toEqual(" test1");
  });

  it('should filter out read-only results from output drop-down list', async () => {
    await fixture.whenStable();
    const output = fixture.debugElement.query(By.css('.outputAutocomplete')).nativeElement;

    expect(output.innerText).toEqual(" test1 test3 [Write-only]");
  });

  it('should filter results for output drowdown list based on input', async () => {
    await fixture.whenStable();
    const outputInput = fixture.debugElement.query(By.css('.outputInput')).nativeElement;

    outputInput.value = "1";
    outputInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const output = fixture.debugElement.query(By.css('.outputAutocomplete')).nativeElement;

    expect(output.innerText).toEqual(" test1");
  });
});
