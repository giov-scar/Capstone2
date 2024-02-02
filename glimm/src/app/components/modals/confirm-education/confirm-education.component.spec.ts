import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEducationComponent } from './confirm-education.component';

describe('ConfirmEducationComponent', () => {
  let component: ConfirmEducationComponent;
  let fixture: ComponentFixture<ConfirmEducationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmEducationComponent]
    });
    fixture = TestBed.createComponent(ConfirmEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
