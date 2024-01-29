import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserWorkModalComponent } from './delete-user-work-modal.component';

describe('DeleteUserWorkModalComponent', () => {
  let component: DeleteUserWorkModalComponent;
  let fixture: ComponentFixture<DeleteUserWorkModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteUserWorkModalComponent]
    });
    fixture = TestBed.createComponent(DeleteUserWorkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
