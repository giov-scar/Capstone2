import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-intro-modal',
  templateUrl: './confirm-intro-modal.component.html',
  styleUrls: ['./confirm-intro-modal.component.scss']
})
export class ConfirmIntroModalComponent {
  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close('confirm');
  }
}
