import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/classes/artist';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserProfile(uid:string):Observable<Artist>{
    const url = `https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`
    return this.http.get<Artist>(url)
  }
}
