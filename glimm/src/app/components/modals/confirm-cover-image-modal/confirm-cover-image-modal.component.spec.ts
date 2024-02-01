import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCoverImageModalComponent } from './confirm-cover-image-modal.component';

describe('ConfirmCoverImageModalComponent', () => {
  let component: ConfirmCoverImageModalComponent;
  let fixture: ComponentFixture<ConfirmCoverImageModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmCoverImageModalComponent]
    });
    fixture = TestBed.createComponent(ConfirmCoverImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
