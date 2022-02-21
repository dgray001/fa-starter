import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of, pipe } from 'rxjs';
import { tap, mapTo } from 'rxjs/operators';

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
  const mockFile: File = new File(['mock file'], 'mockfile.smi', { } );
  const mockEventNoFile = { target: { files: [] } };
  const mockEventMultipleFiles = { target: { files: [mockFile, mockFile] } };
  const mockEvent = { target: { files: [mockFile] } };

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
    spyOn(component, 'uploadFiles');
    const mockEvent = new Event('change');
    const uploadFileInput = fixture.debugElement.query(By.css('input')).nativeElement;

    uploadFileInput.dispatchEvent(mockEvent);
    fixture.detectChanges();

    expect(component.uploadFiles).toHaveBeenCalledWith(mockEvent);
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
    spyOn(component, 'uploadFiles').and.callThrough();

    of(null).pipe(component.uploadFiles(mockEventMultipleFiles)).subscribe();
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('.message'));

    expect(message.nativeElement.innerText).toEqual("Cannot upload multiple files");
  });

  it('should update service data if file uploaded', async () => {
    await fixture.whenStable();
    spyOn(component, 'uploadFiles').and.callThrough();
    let uploading: boolean = true;

    const eventSub = of(null).pipe(component.uploadFiles(mockEvent)).subscribe(
      result => {
        fixture.detectChanges();
        const message = fixture.debugElement.query(By.css('.message')).nativeElement;
        if (uploading) {
          expect(message.innerText).toEqual("uploading mockfile.smi");
          const sub = service.data$.subscribe(
            data => {
              expect(data['inputString']).toEqual('');
              expect(data['inputFormat']).toEqual('');
            }
          );
          sub.unsubscribe();
        }
        else {
          expect(message.innerText).toEqual("uploaded mockfile.smi");
          const sub = service.data$.subscribe(
            data => {
              expect(data['inputString']).toEqual('mock file');
              expect(data['inputFormat']).toEqual('smi -- SMILES');
            }
          );
          sub.unsubscribe();
        }
        uploading = false;
      }
    );
    eventSub.unsubscribe();
    /*await fixture.whenStable();
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('.message'));

    expect(message.nativeElement.innerText).toEqual("uploading mockfile");
    service.data$.subscribe(
      data => expect(data['inputString']).toEqual('mock file')
    ); */
  });
});
