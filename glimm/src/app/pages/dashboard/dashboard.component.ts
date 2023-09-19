import { IArtist } from './../../shared/artist';
import { Component, OnInit } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { Artist } from 'src/app/classes/artist';
import {  RouterModule } from '@angular/router';


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
  constructor(public authService: AuthService){}
  ngOnInit(): void {
    this.authService.getUser().subscribe((data) =>{
      console.log(data);
      this.artistData = data;

    })
  }
}
