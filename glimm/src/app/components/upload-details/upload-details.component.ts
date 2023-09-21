import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { FileUpload } from './../../models/file-upload.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.scss']
})
export class UploadDetailsComponent {
  @Input() fileUpload!: FileUpload

  constructor(private uploadService: FileUploadService){}

  // deleteFileUpload(fileUpload: FileUpload): void{
  //   this.uploadService.deleteFile(fileUpload)
  // }

}
