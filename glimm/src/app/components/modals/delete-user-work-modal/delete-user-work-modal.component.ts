import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-user-work-modal',
  templateUrl: './delete-user-work-modal.component.html',
  styleUrls: ['./delete-user-work-modal.component.scss']
})
export class DeleteUserWorkModalComponent {
  constructor (public activeModal: NgbActiveModal) {}

  dismiss(){
    this.activeModal.dismiss()
  }

  confirm(){
    this.activeModal.close('confirmed')
  }

}
