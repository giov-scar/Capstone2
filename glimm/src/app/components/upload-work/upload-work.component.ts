import { Component, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/models/file-upload.model';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { CommonModule } from '@angular/common';
import { Artist } from 'src/app/classes/artist';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ref } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-upload-work',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './upload-work.component.html',
  styleUrls: ['./upload-work.component.scss']
})
export class UploadWorkComponent  implements OnInit {

  selectedFiles!: FileList
  currentFileUpload!: FileUpload
  showProgressBar = false;
  percentage = 0
  uploadCompleted = false;
  successMessage = "Upload completed successfully!"
  User!: Artist



  fileUploads: FileUpload[] = []
  noDuplicate: FileUpload[] = []

  constructor(private uploadService: FileUploadService, public auth:AuthService, public http: HttpClient, private userService: UserService){ }

  ngOnInit() {
    this.loadCurrentUserProfile()
  }

  loadCurrentUserProfile() {
    const userUid = JSON.parse(localStorage.getItem('user') || '{}');
    const uid = userUid[Object.keys(userUid)[0]];
    if (uid) {
      this.userService.getUserProfile(uid).subscribe(
        (userProfile) => {
          this.User = userProfile;
          console.log('Dati utente caricati:', this.User);
        },
        (error) => console.error('Errore durante il recupero del profilo utente', error)
      );
    }
  }

    selectFile(event: Event): void {
      this.selectedFiles = (event.target as HTMLInputElement).files!
    }

    upload(): void {
      console.log(this.fileUploads);
      console.log("selected files: ", this.selectedFiles);


      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
        if (file) {
          console.log("file",file);
          this.currentFileUpload = new FileUpload(file);


          this.uploadService.uploadProgress$.next(0);

          this.showProgressBar = true;
          this.uploadCompleted = false;
          this.uploadService.pushFileToStorage(this.currentFileUpload, this.User).then((dowloadURL) => {
            console.log("data",dowloadURL);
            this.currentFileUpload.url = dowloadURL;
          });
          console.log("FILE CON URL!",this.currentFileUpload);


          this.uploadService.uploadProgress$.subscribe((percentage) => {
            this.percentage = percentage;
            if (percentage === 100) {
              setTimeout(() => {
                this.uploadCompleted = true;
                this.showProgressBar = false;
                this.uploadService.uploadProgress$.next(0);
                this.fileUploads.push(this.currentFileUpload);
                this.noDuplicate = [...new Set(this.fileUploads)]
                const photoArray: string[] = []
                this.noDuplicate.forEach(photo => {
                  photoArray.push(photo.url)
                })
                localStorage.setItem('photoUpload', JSON.stringify(photoArray))
              }, 2000);
              console.log(this.noDuplicate);
            }
          });
        }
      }
    }




    deleteFileUpload(fileUpload: FileUpload): void{
      this.uploadService.deleteFile(fileUpload, this.User )
      this.noDuplicate = this.noDuplicate.filter(upload => upload.file.name !== fileUpload.file.name)
    }

  }
