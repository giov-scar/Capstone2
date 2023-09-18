import { Injectable } from '@angular/core';
import { IArtist } from './artist';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  artistsRef!: AngularFireList<any>;
  artistRef!: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) { }
//   AddArtist(artist: IArtist): {
//     this.artistsRef.push({
//       firstName: artist.firstName,
//       firstName: artist.lastName,
//       email: artist.email,
//       profileImg: artist.profileImg,
//       coverImg: artist.coverImg,
//       baCourse: artist.baCourse,
//       maCourse: artist.maCourse,
//       description: artist.description
//     })

// }

}
