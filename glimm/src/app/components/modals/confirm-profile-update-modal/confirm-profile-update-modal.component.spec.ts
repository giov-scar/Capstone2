import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmProfileUpdateModalComponent } from './confirm-profile-update-modal.component';

describe('ConfirmProfileUpdateModalComponent', () => {
  let component: ConfirmProfileUpdateModalComponent;
  let fixture: ComponentFixture<ConfirmProfileUpdateModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmProfileUpdateModalComponent]
    });
    fixture = TestBed.createComponent(ConfirmProfileUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
