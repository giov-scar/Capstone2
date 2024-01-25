import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfirmModalComponent } from './edit-confirm-modal.component';

describe('EditConfirmModalComponent', () => {
  let component: EditConfirmModalComponent;
  let fixture: ComponentFixture<EditConfirmModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditConfirmModalComponent]
    });
    fixture = TestBed.createComponent(EditConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
