import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artist } from 'src/app/classes/artist';
import { UserService } from 'src/app/shared/services/user.service';
import { IWork } from 'src/app/shared/work';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  user:Artist | undefined
  works: IWork[] = [];

  constructor(private userService: UserService, private route: ActivatedRoute){}

  ngOnInit() {
    const uid = this.route.snapshot.paramMap.get('uid');
    if(uid){
      this.userService.getUserProfile(uid).subscribe(
        (profile) => {
          this.user = profile
          console.log(this.user);

          if(this.user.uploadedWork){
            this.works = Object.values(this.user.uploadedWork)
            .filter(work => work.id && work.id.startsWith('work_'))
            .sort((a,b) => {
              const dateA = new Date (a.createdAt).getTime()
              const dateB = new Date (b.createdAt).getTime()
              return dateB - dateA
            })
          }
        },
        (error) => {
          console.error('Errore durante il recupero del profilo utente', error);
        }
      )
    }
  }
}
