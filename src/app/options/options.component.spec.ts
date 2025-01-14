import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of, pipe, NEVER } from 'rxjs';
import { tap, mergeMap } from 'rxjs/operators';

import { OpenBabelData } from '../OpenBabelData';
import { OptionsComponent } from './options.component';
import { MockSubmitService } from '../submit.mock.service';
import { DataService } from '../submit.abstract.service';
import { SubmitService } from '../submit.service';

describe('OptionsComponent', () => {
  let component: OptionsComponent;
  let fixture: ComponentFixture<OptionsComponent>;
  let loader: HarnessLoader;
  let service: MockSubmitService;
  const blankData: OpenBabelData = {inputString: "",
    inputFormat: "", outputFormat: "", additionalOptions: ""};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ FormsModule, ReactiveFormsModule, MatAutocompleteModule, HttpClientTestingModule ],
      declarations: [ OptionsComponent ],
      providers: [ OptionsComponent, { provide: DataService, useClass: MockSubmitService } ]
    })
    .compileComponents();
  });

  const ComponentState = {
    BLANK: "Blank",
    VALID: "Valid",
    SUBMITTING: "Submitting",
    VALID_AND_SUBMITTING: "Valid and Submitting",
    INVALID_INPUT: "Invalid Input",
    VALID_INPUT: "Valid Input",
    INVALID_OUTPUT: "Invalid Output",
    VALID_OUTPUT: "Valid Output",
  };
  async function createState(state: string = ComponentState.BLANK) {
    service = TestBed.inject(DataService);
    fixture = TestBed.createComponent(OptionsComponent);
    component = fixture.componentInstance;
    component.formats = [ "test1", "test2 [Read-only]", "test3 [Write-only]" ];
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
    const input = await loader.getHarness(MatAutocompleteHarness.with({
      selector: '.inputInput'}));
    const output = await loader.getHarness(MatAutocompleteHarness.with({
      selector: '.outputInput'}));
    switch(state) {
      case ComponentState.BLANK:
        break;
      case ComponentState.VALID:
        await input.focus();
        await input.enterText("acesout -- ACES output format [Read-only]");
        await output.focus();
        await output.enterText("acesin -- ACES input format [Write-only]");
        break;
      case ComponentState.VALID_AND_SUBMITTING:
        await input.focus();
        await input.enterText("acesout -- ACES output format [Read-only]");
        await output.focus();
        await output.enterText("acesin -- ACES input format [Write-only]");
        spyOn<any>(service, 'submit').and.returnValue(pipe(mergeMap(() => NEVER.pipe())));
        const submit = fixture.debugElement.query(By.css('.submitButton')).nativeElement;
        submit.click();
        dispatchEvent(new Event('click'));
        fixture.detectChanges();
        break;
      case ComponentState.INVALID_INPUT:
        await input.focus();
        await input.enterText("Invalid input format");
        break;
      case ComponentState.VALID_INPUT:
        await input.focus();
        await input.enterText("acesout -- ACES output format [Read-only]");
        break;
      case ComponentState.INVALID_OUTPUT:
        await output.focus();
        await output.enterText("Invalid output format");
        break;
      case ComponentState.VALID_OUTPUT:
        await output.focus();
        await output.enterText("acesin -- ACES input format [Write-only]");
        break;
      default:
        console.log("State not found.");
        break;
    }
    fixture.detectChanges();
  };

  it('should create', () => {
    createState();
    expect(component).toBeTruthy();
  });

  it('should filter out write-only results from input drop-down list', async () => {
    await createState();
    const input = await loader.getHarness(MatAutocompleteHarness.with({
      selector: '.inputInput'}));

    await input.focus();
    let options = await input.getOptions();

    expect((await input.getOptions()).length).toEqual(2);
    expect((await options[1].getText())).toEqual("test2 [Read-only]");
  });

  it('should filter results for input drowdown list based on input', async () => {
    await createState();
    const input = await loader.getHarness(MatAutocompleteHarness.with({
      selector: '.inputInput'}));

    await input.focus();
    await input.enterText("1");
    let options = await input.getOptions();

    expect(options.length).toEqual(1);
    expect((await options[0].getText())).toEqual("test1");
  });

  it('should filter out read-only results from output drop-down list', async () => {
    await createState();
    const output = await loader.getHarness(MatAutocompleteHarness.with({
      selector: '.outputInput'}));

    await output.focus();
    let options = await output.getOptions();

    expect(options.length).toEqual(2);
    expect(await options[1].getText()).toEqual("test3 [Write-only]");
  });

  it('should filter results for output drowdown list based on input', async () => {
    await createState();
    const output = await loader.getHarness(MatAutocompleteHarness.with({
      selector: '.outputInput'}));

    await output.focus();
    await output.enterText("1");
    let options = await output.getOptions();

    expect(options.length).toEqual(1);
    expect((await options[0].getText())).toEqual("test1");
  });

  it('should display mat-errors if input form control is blank', async () => {
    await createState();
    const inputError = fixture.debugElement.query(By.css('.input-error'));
    const outputError = fixture.debugElement.query(By.css('.output-error'));
    expect(inputError).toBeTruthy();
    expect(outputError).toBeTruthy();
  });

  it('should display input mat-error if input form control is invalid', async () => {
    await createState(ComponentState.INVALID_INPUT);
    const inputError = fixture.debugElement.query(By.css('.input-error'));
    expect(inputError).toBeTruthy();
  });

  it('should display output mat-error if output form control is invalid', async () => {
    await createState(ComponentState.INVALID_OUTPUT);
    const outputError = fixture.debugElement.query(By.css('.output-error'));
    expect(outputError).toBeTruthy();
  });

  it('should not display input mat-error if input form control is valid', async () => {
    await createState(ComponentState.VALID_INPUT);
    const inputError = fixture.debugElement.query(By.css('.input-error'));
    expect(inputError).toBeNull();
  });

  it('should not display output mat-error if output form control is valid', async () => {
    await createState(ComponentState.VALID_OUTPUT);
    const outputError = fixture.debugElement.query(By.css('.output-error'));
    expect(outputError).toBeNull();
  });

  it('should update data$ observable from input in outputFormat box', async () => {
    await createState();
    const output = await loader.getHarness(MatAutocompleteHarness.with({
      selector: '.outputInput'}));

    await output.focus();
    await output.enterText("Output format");

    service.data$.subscribe(
      data => expect(data['outputFormat']).toEqual("Output format")
    );
  });

  it('should update data$ observable from input in inputFormat box', async () => {
    await createState();
    const input = await loader.getHarness(MatAutocompleteHarness.with({
      selector: '.inputInput'}));

    await input.focus();
    await input.enterText("Input format");

    service.data$.subscribe(
      data => expect(data['inputFormat']).toEqual("Input format")
    );
  });

  it('should update data$ observable from additional options string', async () => {
    await createState();
    const additionalOptionsHarness = await loader.getHarness(MatInputHarness.with(
      {selector: '.additionalOptions'}));

    service.data$.subscribe(
      data => expect(data['additionalOptions']).toEqual("")
    );
    await additionalOptionsHarness.setValue("Some additional options text");

    service.data$.subscribe(
      data => expect(data['additionalOptions']).toEqual("Some additional options text")
    );
  });

  it('should call service.submit when submit button is pressed', async () => {
    await createState(ComponentState.VALID);
    spyOn<any>(service, 'submit').and.callThrough();
    const submit = fixture.debugElement.query(By.css('.submitButton')).nativeElement;

    submit.click();
    dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(service.submit).toHaveBeenCalled();
  });

  for (const state of Object.keys(ComponentState)) {
    if (state == "VALID") {
      it('should enable submit button if formats valid and not submitting', async () => {
        await createState(ComponentState[state]);
        const submit = fixture.debugElement.query(By.css('.submitButton')).nativeElement;
        expect(submit.disabled).toEqual(false);
      });
    }
    else {
      it('should disable submit button in all other states', async () => {
        await createState(ComponentState[state]);
        const submit = fixture.debugElement.query(By.css('.submitButton')).nativeElement;
        expect(submit.disabled).toEqual(true);
      });
    }
  }
});
