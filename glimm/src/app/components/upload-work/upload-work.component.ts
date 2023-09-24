import { Component, Input } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { FileUpload } from 'src/app/models/file-upload.model';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { CommonModule } from '@angular/common';
import { Artist } from 'src/app/classes/artist';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-upload-work',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './upload-work.component.html',
  styleUrls: ['./upload-work.component.scss']
})
export class UploadWorkComponent {

  selectedFiles!: FileList
  currentFileUpload!: FileUpload
  percentage = 0
  User!: Artist

  fileUploads!: DocumentData[]

  constructor(private uploadService: FileUploadService, private auth:AuthService){ }

    selectFile(event: Event): void {
      this.selectedFiles = (event.target as HTMLInputElement).files!
    }

    upload(): void {
      if (this.selectedFiles){
        const file:File | null = this.selectedFiles.item(0)
        if(file){
          this.currentFileUpload = new FileUpload(file)
           // Imposta il nome del file
          this.uploadService.pushFileToStorage(this.currentFileUpload,this.User )
        }
      }
    }

    ngOnInit() {
      this.auth.getUser().subscribe(user => {
        this.User = user
        this.uploadService.getFiles(this.User).subscribe(fileUploads => {
          this.fileUploads = fileUploads;
          console.log(this.fileUploads);
      })
    })
    }

    deleteFileUpload(fileUpload: DocumentData): void{
      this.uploadService.deleteFile(fileUpload, this.User)
      this.fileUploads = this.fileUploads.filter(upload => upload['name'] !== fileUpload['name'])

    }
}
