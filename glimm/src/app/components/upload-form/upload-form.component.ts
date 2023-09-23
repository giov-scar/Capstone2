import { Component } from '@angular/core';
import { FileUpload } from 'src/app/models/file-upload.model';
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

  constructor(private uploadService: FileUploadService){ }

    selectFile(event: Event): void {
      this.selectedFiles = (event.target as HTMLInputElement).files!
    }

    upload(): void {
      if (this.selectedFiles){
        const file:File | null = this.selectedFiles.item(0)
        // this.selectedFiles = FileUpload


        if(file){
          this.currentFileUpload = new FileUpload(file)
           // Imposta il nome del file
          this.uploadService.pushFileToStorage(this.currentFileUpload)

          // .subscribe(
          //   percentage => {
          //     this.percentage = Math.round(percentage ? percentage : 0)
          //   },
          //   error => {
          //     console.log(error);

          //   }
          // )
        }
      }
    }

}
