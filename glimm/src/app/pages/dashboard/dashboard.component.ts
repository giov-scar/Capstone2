import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { Artist } from 'src/app/classes/artist';
import { RouterModule, Router } from '@angular/router';
import { ref } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';

import { UploadWorkComponent } from 'src/app/components/upload-work/upload-work.component';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { ToastrService } from 'ngx-toastr';
import { IWork } from 'src/app/shared/work';
import { UserService } from 'src/app/shared/services/user.service';
import { EditWorkModalComponent } from 'src/app/components/edit-work-modal/edit-work-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgbNavModule,
    NgbNavModule,
    CommonModule,
    RouterModule,
    UploadWorkComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  active = 'Intro';
  artistData!: Artist;
  fileUploads!: string[];
  work!:IWork
  userFavorites: IWork[] = [];

  constructor(
    public authService: AuthService,
    public http: HttpClient,
    public uploadService: FileUploadService,
    private toastr: ToastrService,
    private userService: UserService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  userUid = JSON.parse(localStorage['user']);
  uid = this.userUid[Object.keys(this.userUid)[0]];
  userWorks: IWork[] = [];

  userDb = ref(this.authService.database, `users/  ${this.uid}`);

  ngOnInit() {
    this.loadUserProfile();
    this.loadUserWorks();
    this.loadUserFavorites()
  }

  loadUserProfile() {
    this.userService.getUserProfile(this.uid).subscribe(
      userProfile => {
        this.artistData = userProfile;
        console.log(this.artistData);
      },
      error => console.error('Errore durante il recupero del profilo utente', error)
    );
  }

  loadUserWorks() {
    this.userService.getWorksByUser(this.uid).subscribe(
      works => this.userWorks = works,
      error => console.error('Errore durante il recupero dei lavori utente', error)
    );
  }

  loadUserFavorites() {
    this.userService.getFavorites(this.uid).subscribe(
      favorites => {
        this.userFavorites = favorites;
        console.log('Lavori preferiti:', this.userFavorites);
      },
      error => console.error('Errore durante il recupero dei lavori preferiti', error)
    );
  }

  // removeFavorite(workId: string) {
  //   this.userService.removeFavorite(this.uid, workId).subscribe(
  //     () => {
  //       // Rimuovi il lavoro dall'array di lavori preferiti
  //       this.favoriteWorks = this.favoriteWorks.filter(work => work.id !== workId);
  //     },
  //     error => console.error('Errore durante la rimozione del lavoro dai preferiti', error)
  //   );
  // }

  ShowSuccess(){
    this.toastr.show('Now your work is pubblished!', `🎉 Upload completed successfully!`,{
      progressBar: true,
      toastClass: 'ngx-toastr',
      timeOut: 5000,
      closeButton: true,
      easing: 'easeOut'
    })
  }

  pushWork() {
    const title = (document.getElementById('inputTitle') as HTMLInputElement)
      ?.value;
    const description = (
      document.getElementById('intro-text') as HTMLTextAreaElement
    )?.value;
    const checkboxes = document.querySelectorAll('input[type="checkbox"][data-label]:checked');
    const categories: string[] = [];

    checkboxes.forEach((checkbox) => {
      const label = checkbox.getAttribute('data-label');
      if (label) {
        categories.push(label);
      }
    });

    const photo: string[] = [];
    let photoArray = localStorage.getItem("photoUpload");
    this.fileUploads = JSON.parse(photoArray!);
    this.fileUploads.forEach((file) => {
      photo.push(file)
    })

    console.log(photo, categories);

    // Post the work to Realtime Database.
    this.uploadService.postWork(
      title,
      description,
      categories,
      photo,
      this.artistData
    );

    this.ShowSuccess();
    setTimeout(()=>{window.location.reload()}, 5000)

  }

  openEditWorkModal(work:IWork){
    const modalRef = this.modalService.open(EditWorkModalComponent)
    modalRef.componentInstance.work = work
    modalRef.componentInstance.currentArtist = this.artistData
  }


}
