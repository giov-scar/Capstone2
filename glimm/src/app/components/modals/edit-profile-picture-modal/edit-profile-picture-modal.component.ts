import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmProfileUpdateModalComponent } from '../confirm-profile-update-modal/confirm-profile-update-modal.component';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Artist } from 'src/app/classes/artist';

@Component({
  selector: 'app-edit-profile-picture-modal',
  templateUrl: './edit-profile-picture-modal.component.html',
  styleUrls: ['./edit-profile-picture-modal.component.scss']
})
export class EditProfilePictureModalComponent {
  constructor (public activeModal: NgbActiveModal, private modalService: NgbModal, private uploadService:FileUploadService, private userService:UserService) {}


}
