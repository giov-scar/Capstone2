import { Component } from '@angular/core';
import { Artist } from 'src/app/classes/artist';
import { FileUpload } from 'src/app/models/file-upload.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent {
  selectedFiles!: FileList
  currentFileUpload!: FileUpload
  percentage = 0
  currentArtist!: Artist

  constructor(private uploadService: FileUploadService, private auth:AuthService, ){ }

    selectFile(event: Event): void {
      this.selectedFiles = (event.target as HTMLInputElement).files!
    }

    upload(): void {
      if (this.selectedFiles){
        const file:File | null = this.selectedFiles.item(0)
        // this.selectedFiles = FileUpload


        if(file){
          this.currentFileUpload = new FileUpload(file)
           // Set name file
          this.uploadService.pushFileToStorage(this.currentFileUpload, this.currentArtist)
        }
      }
    }


}
