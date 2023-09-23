// import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { FileUpload } from './../../models/file-upload.model';
import { Component, Input } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.scss']
})
export class UploadDetailsComponent {
  @Input() fileUpload!: DocumentData

  constructor(private uploadService: FileUploadService){}

  deleteFileUpload(fileUpload: DocumentData): void{
    this.uploadService.deleteFile(fileUpload)
    
  }

}
