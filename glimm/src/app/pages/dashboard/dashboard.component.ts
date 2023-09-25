import { FileUpload } from 'src/app/models/file-upload.model';
import { Component, OnInit } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { Artist } from 'src/app/classes/artist';
import { RouterModule } from '@angular/router';
import { ref } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { UploadWorkComponent } from 'src/app/components/upload-work/upload-work.component';
import { DocumentData } from '@angular/fire/firestore';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgbNavModule, NgbNavModule, CommonModule, RouterModule, UploadWorkComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  active = 'Intro';
  artistData!:Artist;
  fileUploads!: DocumentData[]



  constructor(public authService: AuthService, public http: HttpClient, public uploadService: FileUploadService ){}

  userUid = JSON.parse(localStorage['user']);
  uid = this.userUid[Object.keys(this.userUid)[0]];


  userDb = ref(this.authService.database, `users/  ${this.uid}`);

  getUser() {
    console.log(this.uid);
    return this.http.get<Artist>(
      `https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/users/${this.uid}.json?auth=${environment.firebase.apiKey}`
      );
  }
  ngOnInit() {
  this.getUser().subscribe((data) =>{
      console.log(data);
      this.artistData = data;
      this.uploadService.getFiles(this.artistData).subscribe(fileUploads => {
        this.fileUploads = fileUploads;
    })
  })
  }

  pushWork(){
      // Recupera i valori dai campi di input
  const titleValue = (<HTMLInputElement>document.getElementById('inputTitle')).value;
  const introValue = (<HTMLTextAreaElement>document.getElementById('intro-text')).value;

  // Crea un oggetto per contenere i dati
  const workData = {
    title: titleValue,
    intro: introValue
  };

  // Salva l'oggetto in localStorage come stringa JSON
  localStorage.setItem('workData', JSON.stringify(workData));

  // Ora i dati sono salvati in localStorage con la chiave 'workData'

    localStorage.setItem('upload', JSON.stringify(this.fileUploads))
  }

}
