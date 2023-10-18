import { Component } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { FileUpload } from 'src/app/models/file-upload.model';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { CommonModule } from '@angular/common';
import { Artist } from 'src/app/classes/artist';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ref } from '@angular/fire/database';
import { environment } from 'src/environments/environment';


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
  showProgressBar = false;
  percentage = 0
  uploadCompleted = false;
  successMessage = "Upload completed successfully!"
  User!: Artist



  fileUploads!: DocumentData[]

  constructor(private uploadService: FileUploadService, public auth:AuthService, public http: HttpClient){ }

    selectFile(event: Event): void {
      this.selectedFiles = (event.target as HTMLInputElement).files!
    }

    upload(): void {
      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
        if (file) {
          this.currentFileUpload = new FileUpload(file);
          this.uploadService.uploadProgress$.next(0);

          this.showProgressBar = true; 
          this.uploadCompleted = false;

          this.uploadService.pushFileToStorage(this.currentFileUpload, this.User);

          this.uploadService.uploadProgress$.subscribe((percentage) => {
            this.percentage = percentage;
            if (percentage === 100) {
              setTimeout(() => {
                this.uploadCompleted = true;
                this.showProgressBar = false;
                this.uploadService.uploadProgress$.next(0);
              }, 2000);
            }
          });
        }
      }
    }



    userUid = JSON.parse(localStorage['user']);
  uid = this.userUid[Object.keys(this.userUid)[0]];


  userDb = ref(this.auth.database, `users/  ${this.uid}`);

  getUser() {
    console.log(this.uid);
    return this.http.get<Artist>(
      `https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/users/${this.uid}.json?auth=${environment.firebase.apiKey}`
      );
  }

    ngOnInit() {
      this.getUser().subscribe((user) => {
        this.User = user
        this.uploadService.getFiles(this.User).subscribe(fileUploads => {
          this.fileUploads = fileUploads;
          console.log(this.fileUploads);
      })
    })
    }

    deleteFileUpload(fileUpload: DocumentData): void{
      this.uploadService.deleteFile(fileUpload, this.User )
      this.fileUploads = this.fileUploads.filter(upload => upload['name'] !== fileUpload['name'])
    }

  }
