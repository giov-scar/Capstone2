import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Database } from '@angular/fire/database';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Artist } from 'src/app/classes/artist';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  profileImageFile: File | null = null;
  coverImageFile: File | null = null;
  constructor(
    public authService: AuthService,
    public database: Database,
    private fb: FormBuilder,
    public uploadService: FileUploadService
  ) {}

  onProfileImageChange(event: Event){
    const element = event.target as HTMLInputElement
    if(element.files && element.files.length){
      this.profileImageFile = element.files[0]
    }
  }

  onCoverImageChange(event: Event) {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length) {
      this.coverImageFile = element.files[0];
    }
  }

  async registerUser() {
    let artist: Artist = new Artist(
      this.form.value.artistname,
      this.form.value.artistsurname,
      this.form.value.email,
      this.form.value.password,
      this.form.value.profileImg,
      this.form.value.coverImg,
      this.form.value.baCourse,
      this.form.value.maCourse,
      this.form.value.intro,
    );
    try {
      const userCredential = await this.authService.SignUp(this.authService.fsAuth, artist);
      const uid = userCredential.user.uid;

      const defaultProfileImageUrl = 'https://images.unsplash.com/photo-1673586410488-b694d350756e?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      const defaultCoverImageUrl = 'https://images.unsplash.com/photo-1673586410488-b694d350756e?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

      artist.uid = uid;

    if (this.profileImageFile) {
      const profileImageUrl = await this.uploadService.pushFileToStorage({ file: this.profileImageFile }, artist);
      artist.profile_picture = profileImageUrl;
    } else {
      artist.profile_picture = defaultProfileImageUrl;
    }

    if (this.coverImageFile) {
      const coverImageUrl = await this.uploadService.pushFileToStorage({ file: this.coverImageFile }, artist);
      artist.coverImg = coverImageUrl;
    } else {
      artist.coverImg = defaultCoverImageUrl;
    }

    this.authService.writeUserData(artist, userCredential.user);
  } catch (error) {
    console.error("Errore durante la registrazione dell'utente", error);
  }
    console.log(this.form);
  }

  ngOnInit() {
    this.form = this.fb.group({
      artistname: this.fb.control(''),
      artistsurname: this.fb.control(''),
      email: this.fb.control(''),
      password: this.fb.control(''),
      profileImg: this.fb.control(''),
      coverImg: this.fb.control(''),
      baCourse: this.fb.control(''),
      maCourse: this.fb.control(''),
      intro: this.fb.control('')
    });
  }
}
