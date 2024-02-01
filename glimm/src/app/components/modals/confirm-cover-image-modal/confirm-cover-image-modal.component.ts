import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-cover-image-modal',
  templateUrl: './confirm-cover-image-modal.component.html',
  styleUrls: ['./confirm-cover-image-modal.component.scss']
})
export class ConfirmCoverImageModalComponent {
  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close('confirm');
  }
}
