import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of, pipe } from 'rxjs';
import { tap, mapTo, shareReplay } from 'rxjs/operators';

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
  const mockFile: File = new File(['mock file contents'], 'mockfile.smi', { } );

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
    const inputTextbox = fixture.debugElement.query(By.css('.inputTextBox')).nativeElement;
    service.data$.subscribe(
      data => expect(data['inputString']).toEqual("")
    );

    inputTextbox.value = "Some input text";
    inputTextbox.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    service.data$.subscribe(
      data => expect(data['inputString']).toEqual("Some input text")
    );
  });

  it('should call fileInput.click() when the upload file button is pressed', async () => {
    await fixture.whenStable();
    const uploadFileButton = fixture.debugElement.query(By.css('.uploadFileButton')).nativeElement;
    const uploadFileInput = fixture.debugElement.query(By.css('input')).nativeElement;
    spyOn(uploadFileInput, "click");

    uploadFileButton.click();
    uploadFileButton.dispatchEvent(new Event('click'));

    expect(uploadFileInput.type).toEqual('file');
    expect(uploadFileInput.click).toHaveBeenCalled();
  });

  it('should call component.uploadFiles(event) when fileInput has a change event', async () => {
    await fixture.whenStable();
    let uploadSpy = spyOn(component, 'uploadFiles');
    const mockEvent = new Event('change');
    const uploadFileInput = fixture.debugElement.query(By.css('input')).nativeElement;

    uploadFileInput.dispatchEvent(mockEvent);
    fixture.detectChanges();

    expect(uploadSpy).toHaveBeenCalledWith(mockEvent);
  });

  it('should display no message initially', async () => {
    await fixture.whenStable();
    let message = fixture.debugElement.query(By.css('.message'));

    expect(message).toBeNull();
  });

  it('should display error message if uploading no file', async () => {
    await fixture.whenStable();
    spyOn(component, 'uploadFiles').and.callThrough();
    const uploadFileInput = fixture.debugElement.query(By.css('input')).nativeElement;

    uploadFileInput.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('.message'));

    expect(message.nativeElement.innerText).toEqual("No file uploaded");
  });

  it('should display error message if uploaded multiple files', async () => {
    await fixture.whenStable();
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(mockFile);
    dataTransfer.items.add(mockFile);
    const uploadFileInput = fixture.debugElement.query(By.css('input')).nativeElement;

    uploadFileInput.files = dataTransfer.files;
    uploadFileInput.dispatchEvent(new InputEvent('change'));
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('.message'));

    expect(message.nativeElement.innerText).toEqual("Cannot upload multiple files");
  });

  it('should update inputString and inputFormat upon file upload', async () => {
    await fixture.whenStable();
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(mockFile);
    const uploadFileInput = fixture.debugElement.query(By.css('input')).nativeElement;

    uploadFileInput.files = dataTransfer.files;
    component.service.data$.pipe(shareReplay(1));
    component.service.data$.subscribe(
      data => console.log(data)
    );
    uploadFileInput.dispatchEvent(new InputEvent('change'));
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('.message'));

    expect(message.nativeElement.innerText).toEqual("uploading mockfile.smi");
  }));
});
