import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadWorkComponent } from './upload-work.component';

describe('UploadWorkComponent', () => {
  let component: UploadWorkComponent;
  let fixture: ComponentFixture<UploadWorkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadWorkComponent]
    });
    fixture = TestBed.createComponent(UploadWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
