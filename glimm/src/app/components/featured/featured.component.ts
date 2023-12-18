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

  constructor(public upload: FileUploadService, public auth:AuthService, public http: HttpClient ){}


  ngOnInit(){
    this.upload.getWork().subscribe(works => {
      this.works = works
      console.log(this.works);
    })
  }

}
