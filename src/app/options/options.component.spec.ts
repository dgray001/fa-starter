import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { OpenBabelData } from '../OpenBabelData';
import { OptionsComponent } from './options.component';

describe('OptionsComponent', () => {
  let component: OptionsComponent;
  let fixture: ComponentFixture<OptionsComponent>;
  let loader: HarnessLoader;
  const blankData: OpenBabelData = {inputString: "",
    inputFormat: "", outputFormat: "", additionalOptions: ""};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ FormsModule, ReactiveFormsModule, MatAutocompleteModule, HttpClientTestingModule ],
      declarations: [ OptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsComponent);
    component = fixture.componentInstance;
    component.formats = [ "test1", "test2 [Read-only]", "test3 [Write-only]" ];
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter out write-only results from input drop-down list', async () => {
    await fixture.whenStable();
    const input = await loader.getHarness(MatAutocompleteHarness.with({
      selector: '.inputInput'}));

    await input.focus();
    let options = await input.getOptions();

    expect(options.length).toEqual(2);
    expect((await options[1].getText())).toEqual("test2 [Read-only]");
  });

  it('should filter results for input drowdown list based on input', async () => {
    await fixture.whenStable();
    const input = await loader.getHarness(MatAutocompleteHarness.with({
      selector: '.inputInput'}));

    await input.focus();
    await input.enterText("1");
    let options = await input.getOptions();

    expect(options.length).toEqual(1);
    expect((await options[0].getText())).toEqual("test1");
  });

  it('should filter out read-only results from output drop-down list', async () => {
    await fixture.whenStable();
    const output = await loader.getHarness(MatAutocompleteHarness.with({
      selector: '.outputInput'}));

    await output.focus();
    let options = await output.getOptions();

    expect(options.length).toEqual(2);
    expect((await options[1].getText())).toEqual("test3 [Write-only]");
  });

  it('should filter results for output drowdown list based on input', async () => {
    await fixture.whenStable();
    const output = await loader.getHarness(MatAutocompleteHarness.with({
      selector: '.outputInput'}));

    await output.focus();
    await output.enterText("1");
    let options = await output.getOptions();

    expect(options.length).toEqual(1);
    expect((await options[0].getText())).toEqual("test1");
  });

  it('should update data$ observable from additional options string', async () => {
    await fixture.whenStable();
    const additionalOptionsHarness = await loader.getHarness(MatInputHarness.with(
      {selector: '.additionalOptions'}));
    let data: OpenBabelData = blankData;
    component.data$ = of(blankData).pipe(tap((thisData) => data = thisData));
    expect(data['additionalOptions']).toEqual("");

    await additionalOptionsHarness.setValue("Some additional options text");

    expect(data['additionalOptions']).toEqual("Some additional options text");
  });

  it('should call service.submit when submit button is pressed', async () => {
    await fixture.whenStable();
    spyOn<any>(component['service'], 'submit');
    const submit = fixture.debugElement.query(By.css('.submitButton')).nativeElement;

    submit.click();
    fixture.detectChanges();

    expect(component['service'].submit).toHaveBeenCalled();
  });

  it('should call service.submit when submit button is pressed', async () => {
    await fixture.whenStable();
    spyOn<any>(component['service'], 'submit');
    const submit = fixture.debugElement.query(By.css('.submitButton')).nativeElement;

    submit.click();
    fixture.detectChanges();

    expect(component['service'].submit).toHaveBeenCalled();
  });

  it('should call service.submit when submit button is pressed', async () => {
    await fixture.whenStable();
    spyOn<any>(component['service'], 'submit');
    const submitButtonHarness = await loader.getHarness(MatButtonHarness.with(
      {selector: '.submitButton'}))
    const submit = fixture.debugElement.query(By.css('.submitButton')).nativeElement;

    submit.click();
    fixture.detectChanges();
    // await submitButtonHarness.click();

    expect(component['service'].submit).toHaveBeenCalled();
  });
});
