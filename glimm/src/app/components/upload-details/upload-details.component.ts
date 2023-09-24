// import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { FileUpload } from './../../models/file-upload.model';
import { Component, Input } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Artist } from 'src/app/classes/artist';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.scss']
})
export class UploadDetailsComponent {
  @Input() fileUpload!: DocumentData


  User!: Artist

  ngOnInit() {
    this.auth.getUser().subscribe(user => {
      this.User = user
  })
}

  constructor(private uploadService: FileUploadService, private auth:AuthService){}


  deleteFileUpload(fileUpload: DocumentData): void{
    this.uploadService.deleteFile(fileUpload,this.User)

  }

}
