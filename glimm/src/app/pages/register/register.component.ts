import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Database } from '@angular/fire/database';
import { FormGroup, Form, FormBuilder } from '@angular/forms';
import { Artist } from 'src/app/classes/artist';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  constructor(
    public authService: AuthService,
    public database: Database,
    private fb: FormBuilder
  ) {}

  registerUser() {
    let artist: Artist = new Artist(
      this.form.value.artistname,
      this.form.value.artistsurname,
      this.form.value.email,
      this.form.value.password,
      this.form.value.profileImg,
      this.form.value.coverImg,
      this.form.value.baCourse,
      this.form.value.maCourse,
      this.form.value.intro
    );
    this.authService.SignUp(this.authService.fsAuth, artist);
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
      intro: this.fb.control(''),
    });
  }
}
