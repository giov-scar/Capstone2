import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-education',
  templateUrl: './confirm-education.component.html',
  styleUrls: ['./confirm-education.component.scss']
})
export class ConfirmEducationComponent {
  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close('confirm');
  }
}
