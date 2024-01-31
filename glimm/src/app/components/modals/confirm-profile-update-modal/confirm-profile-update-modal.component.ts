import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-profile-update-modal',
  templateUrl: './confirm-profile-update-modal.component.html',
  styleUrls: ['./confirm-profile-update-modal.component.scss']
})
export class ConfirmProfileUpdateModalComponent {
  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close('confirm');
  }
}
