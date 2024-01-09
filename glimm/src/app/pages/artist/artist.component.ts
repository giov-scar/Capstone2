import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artist } from 'src/app/classes/artist';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  user:Artist | undefined

  constructor(private userService: UserService, private route: ActivatedRoute){}

  ngOnInit() {
    const uid = this.route.snapshot.paramMap.get('uid');
    if(uid){
      this.userService.getUserProfile(uid).subscribe(
        (profile) => {
          this.user = profile
          console.log(this.user);
        },
        (error) => {
          console.error('Errore durante il recupero del profilo utente', error);
        }
      )
    }
  }
}
