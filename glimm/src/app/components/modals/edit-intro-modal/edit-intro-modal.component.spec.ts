import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIntroModalComponent } from './edit-intro-modal.component';

describe('EditIntroModalComponent', () => {
  let component: EditIntroModalComponent;
  let fixture: ComponentFixture<EditIntroModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditIntroModalComponent]
    });
    fixture = TestBed.createComponent(EditIntroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
