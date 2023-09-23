import { Component, Input } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { filter } from 'rxjs';
import { FileUpload } from 'src/app/models/file-upload.model';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';

@Component({
  selector: 'app-upload-work',
  templateUrl: './upload-work.component.html',
  styleUrls: ['./upload-work.component.scss']
})
export class UploadWorkComponent {

  selectedFiles!: FileList
  currentFileUpload!: FileUpload
  percentage = 0

  fileUploads!: DocumentData[]

  constructor(private uploadService: FileUploadService){ }

    selectFile(event: Event): void {
      this.selectedFiles = (event.target as HTMLInputElement).files!
    }

    upload(): void {
      if (this.selectedFiles){
        const file:File | null = this.selectedFiles.item(0)
        if(file){
          this.currentFileUpload = new FileUpload(file)
           // Imposta il nome del file
          this.uploadService.pushFileToStorage(this.currentFileUpload)

        }
      }
    }

    ngOnInit() {
      this.uploadService.getFiles().subscribe(fileUploads => {
       this.fileUploads = fileUploads;
     })
    }

    deleteFileUpload(fileUpload: DocumentData): void{
      this.uploadService.deleteFile(fileUpload)
      this.fileUploads = this.fileUploads.filter(upload => upload['name'] !== fileUpload['name'])

    }
}
