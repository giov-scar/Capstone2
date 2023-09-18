import { Injectable, NgZone } from '@angular/core';
import { IUser } from '../services/user';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User, user } from '@angular/fire/auth';
// import { getDatabase, set,ref } from '@angular/fire/database';
import {
  Database,
  set,
  ref,
  update,
  getDatabase,
} from '@angular/fire/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { Form, FormGroup } from '@angular/forms';
import { Artist } from 'src/app/classes/artist';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  usersUrl: string = environment.firebase.databaseURL + '/users';
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public database: Database,
    private db: AngularFireDatabase
  ) {
    /* Saving user data in localStorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Sign up with email/password
  SignUp(artist: Artist, email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.writeUserData(artist, result.user);
        this.SendVerificationMail();
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
      artistname: user.displayName,
      artistsurname: artist.surname,
      email: user.email,
      profile_picture: artist.photoURL,
      coverImg: artist.coverImg,
      baCourse: artist.baCourse,
      maCourse: artist.maCourse,
      intro: artist.intro,
    });
  }

  // Send email verification when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['dashboard']);
      });
  }

  // Reset password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
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
    return user !== null && user.emailVerified !== false ? true : false;
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(artist: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${artist.uid}`
    );
    const userData: IUser = {
      uid: artist.uid,
      email: artist.email,
      displayName: artist.displayName,
      photoURL: artist.photoURL,
      emailVerified: artist.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
    });
  }
}
