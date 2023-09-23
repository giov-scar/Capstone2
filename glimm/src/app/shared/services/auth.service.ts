import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  Database,
  set,
  ref,
  update,
  getDatabase,
} from '@angular/fire/database';

import { environment } from 'src/environments/environment';
import { Artist } from 'src/app/classes/artist';
import { BehaviorSubject } from 'rxjs';




@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  usersUrl: string = environment.firebase.databaseURL + '/users';
  isLogged = new BehaviorSubject<boolean>(false)
  constructor(
    public fsAuth: Auth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public database: Database,
    private http: HttpClient
  ) {
    /* Saving user data in localStorage when
    logged in and setting up null when logged out */
    this.fsAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }
  // Sign in with email/password
  SignIn(auth:Auth, email: string, password: string) {
    signInWithEmailAndPassword (auth, email, password)
      .then(() => {
        // this.SetUserData(result.user);
        this.fsAuth.onAuthStateChanged((user) => {
          if (user) {
            this.isLogged.next(true)
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  userUid = JSON.parse(localStorage['user']);
  uid = this.userUid[Object.keys(this.userUid)[0]];


  userDb = ref(this.database, `users/  ${this.uid}`);

  getUser() {
    console.log(this.uid);
    return this.http.get<Artist>(
      `https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/users/${this.uid}.json?auth=${environment.firebase.apiKey}`
      );
  }

  data!:Artist
  // Sign up with email/password
  SignUp(auth:Auth, email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.getUser().subscribe(artist => {
          this.data = artist;
        })
        this.writeUserData( this.data, result.user);
        sendEmailVerification(this.fsAuth.currentUser as User)
        // this.SetUserData(result.user);
        console.log(result);
      })

      .catch((error) => {
        console.log(error);
      });
  }

  writeUserData(artist: Artist, user: any) {
    const db = getDatabase();
    set(ref(db, 'users/' + user.uid), {
      uid: user.uid,
      artistname: artist.artistname,
      artistsurname: artist.artistsurname,
      email: user.email,
      profile_picture: artist.photoURL,
      coverImg: artist.coverImg,
      baCourse: artist.baCourse,
      maCourse: artist.maCourse,
      intro: artist.intro,
    });
  }

  // Send email verification when new user sign up
  // sendEmailVerification() {
  //     // .then((u: any) => u.sendEmailVerification(this.fsAuth.currentUser))
  //     // .then(() => {
  //     //   this.router.navigate(['dashboard']);
  //     // });
  // }

  // Reset password
  ForgotPassword(auth:Auth,passwordResetEmail: string) {
    sendPasswordResetEmail(auth, passwordResetEmail)
      .then(() => {
        console.log(Error);
        ('Password reset email sent successfully, check your inbox');
      })
      .catch((error) => {
        console.log(error);
        error;
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return this.isLogged.getValue()
    // !== null && user.emailVerified !== false ? true : false;
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(artist: any) {
    const db = getDatabase();
    const user = this.fsAuth.currentUser;

    if (user) {
      const userRef = ref(db, 'users/' + user.uid);
      const userData: any = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        // Altri campi dati dell'utente se necessario
      };

      set(userRef, userData)
        .then(() => {
          console.log('Dati utente scritti con successo nel database in tempo reale di Firebase.');
        })
        .catch((error) => {
          console.error('Errore durante la scrittura dei dati dell\'utente:', error);
        });
    }
  }


  // Sign out
  SignOut() {
    return this.fsAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
    });
  }

}
