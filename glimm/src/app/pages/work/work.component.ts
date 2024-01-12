import { UserService } from 'src/app/shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { IWork } from 'src/app/shared/work';
import { Artist } from 'src/app/classes/artist';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  work: IWork | undefined
  artistData!: Artist;
  isFavorite: boolean = false


  constructor( private route: ActivatedRoute, private uploadService: FileUploadService, private userService: UserService){}

  userUid = JSON.parse(localStorage['user']);
  uid = this.userUid[Object.keys(this.userUid)[0]];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const workId = params.get('id');
      const userUid = this.userUid ? this.userUid.uid : null;
      if (workId) {
        this.uploadService.getWorkById(workId).subscribe(work => {
          this.work = work;
          window.scroll(0,0)
          console.log(work);
          this.loadUserProfile();
          if (userUid) {
            this.checkIfFavorite(userUid, workId);
          } else {
            alert('Per favore, esegui il login per aggiungere ai preferiti.');
          }
        });
      }
    });
  }

  loadUserProfile() {
    this.userService.getUserProfile(this.uid).subscribe(
      userProfile => {
        this.artistData = userProfile;
        console.log('Logged User:',this.artistData);
      },
      error => console.error('Errore durante il recupero del profilo utente', error)
    );
  }

  checkIfFavorite(userId: string, workId: string) {
    this.userService.isWorkFavorite(userId, workId).subscribe(isFav => {
      this.isFavorite = isFav;
    }, error => {
      console.error('Errore durante la verifica dei preferiti', error);
      this.isFavorite = false;
    });
  }



  onHeartClick() {
    const workId = this.work?.id;
    if (this.uid && workId) {
      if (this.isFavorite) {
        this.userService.removeFavorite(this.uid, workId).subscribe(() => {
          console.log('Rimosso dai preferiti');
          this.isFavorite = false;
        });
      } else {
        this.userService.addFavorite(this.uid, workId).subscribe(() => {
          console.log('Aggiunto ai preferiti');
          this.isFavorite = true;
        });
      }
    } else {
      alert('Per favore, esegui il login per aggiungere ai preferiti.');
    }
  }


}
