import { IArtist } from './../../shared/artist';

import { Component, OnInit } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { Artist } from 'src/app/classes/artist';
import {  RouterModule } from '@angular/router';
import { ref } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { UploadFormComponent } from 'src/app/components/upload-form/upload-form.component';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgbNavModule, NgbNavModule, CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  active = 'Intro';
  artistData!:Artist;


  constructor(public authService: AuthService, public http: HttpClient, ){}

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
    })
  }

}
