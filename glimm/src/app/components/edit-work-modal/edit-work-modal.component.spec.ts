import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkModalComponent } from './edit-work-modal.component';

describe('EditWorkModalComponent', () => {
  let component: EditWorkModalComponent;
  let fixture: ComponentFixture<EditWorkModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditWorkModalComponent]
    });
    fixture = TestBed.createComponent(EditWorkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
