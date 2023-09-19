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

}
