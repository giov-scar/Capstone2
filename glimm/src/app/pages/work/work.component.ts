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
  loggedUser: Artist | undefined
  isFavorite: boolean = false


  constructor( private route: ActivatedRoute, private uploadService: FileUploadService, private userService: UserService){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const workId = params.get('id');
      if (workId) {
        this.uploadService.getWorkById(workId).subscribe(work => {
          this.work = work;
          window.scroll(0,0)
          console.log(work);
          this.checkIfFavorite(workId);
        });
      }
    });
  }

  checkFavoriteStatus(workId: string) {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').uid;
    this.userService.getFavorites(userId).subscribe(() => {
      this.isFavorite = this.userService.isFavorite(workId);
    });
  }

  onHeartClick() {
    const userUid = JSON.parse(localStorage.getItem('user') || '{}').uid;
    const workId = this.work?.id;

    if (userUid && workId) {
      this.userService.getUserProfile(userUid).subscribe(userProfile => {
        if (userProfile) {
          const favorites = userProfile.favorites || [];

          if (favorites.includes(workId)) {
            // Rimuovi dai preferiti
            const index = favorites.indexOf(workId);
            if (index > -1) {
              favorites.splice(index, 1);
            }
          } else {
            // Aggiungi ai preferiti
            favorites.push(workId);
          }

          // Aggiorna il profilo utente
          userProfile.favorites = favorites;
          this.userService.updateUserProfile(userUid, userProfile).subscribe(() => {
            console.log('Preferiti aggiornati');
          });
        }
      });
    }
  }

  checkIfFavorite(workId: string) {
    const userUid = JSON.parse(localStorage.getItem('user') || '{}').uid;
    this.userService.getFavorites(userUid).subscribe(favoriteWorks => {
      this.isFavorite = favoriteWorks.some(work => work.id === workId);
    });
  }



  }





