import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({

  template: `
  <div class="modal-header">
    <h5 class="modal-title">Confirm Update</h5>
    <button type="button" class="btn-close" (click)="activeModal.dismiss()"></button>
  </div>
  <div class="modal-body">
    Are you sure you want to update this work?
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss()">Cancel</button>
    <button type="button" class="btn btn-primary" (click)="confirm()">Confirm</button>
  </div>
`
})
export class EditConfirmModalComponent {
  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close('confirm');
  }

}
