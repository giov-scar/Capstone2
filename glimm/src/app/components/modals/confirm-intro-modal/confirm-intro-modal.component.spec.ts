import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmIntroModalComponent } from './confirm-intro-modal.component';

describe('ConfirmIntroModalComponent', () => {
  let component: ConfirmIntroModalComponent;
  let fixture: ComponentFixture<ConfirmIntroModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmIntroModalComponent]
    });
    fixture = TestBed.createComponent(ConfirmIntroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
