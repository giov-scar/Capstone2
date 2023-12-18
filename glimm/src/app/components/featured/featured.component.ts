import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/classes/artist';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { HttpClient } from '@angular/common/http';
import { DocumentData } from '@angular/fire/firestore';
import { IWork } from 'src/app/shared/work';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit{
  User!: Artist;
  works: IWork[] = []

  constructor(public uploadService: FileUploadService, public auth:AuthService, public http: HttpClient ){}


  ngOnInit(){
    this.loadWorks()
  }

  loadWorks(){
    this.uploadService.getWork().subscribe(
      (works: IWork[]) => {
      console.log("Dati", works);
      this.works = works.sort((a,b) =>{
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
      this.uploadService.setWorks(this.works)
      console.log("Dati ordinati", this.works);
    },
    error => {
      console.error('Errore durante il recupero dei dati', error);
    }
    )
  }

}
