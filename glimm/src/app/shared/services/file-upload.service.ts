import { Injectable } from '@angular/core';
import { Database, getDatabase, ref, remove } from '@angular/fire/database';
import { Storage, ref as StorageRef,  deleteObject, getDownloadURL } from '@angular/fire/storage';
import { uploadBytes } from '@angular/fire/storage';
import { FileUpload } from 'src/app/models/file-upload.model';
import { DocumentData, Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { child, update } from 'firebase/database';
import { Artist } from 'src/app/classes/artist';


@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private basePath = '/upload';
  fileUploads: any;

  constructor(private db: Database, private storage: Storage, private firedb: Firestore) {}

  pushFileToStorage(newPost:Partial<FileUpload>, currentArtist:Artist){
    const filePath = `${this.basePath}/${currentArtist.uid}/user/${newPost.file?.name}`;
    const storageRef = StorageRef(this.storage, filePath);
    uploadBytes(storageRef, newPost.file as File).then(res => {
      console.log(res);
      return getDownloadURL (storageRef)
    }).then(url => {
      const dbCollection = collection(this.firedb, `${this.basePath}/${currentArtist.uid}/user`)
      addDoc(dbCollection, {name:newPost.file?.name, url})
      // const dbRef = ref(this.db)
      // const userRef = child(dbRef, `users/${currentArtist.uid}/files`)
      // const db = getDatabase();
      // update(ref(db, userRef), {
      //   newPost
      // })

      // .then (url=>{
      //   const rtCollection = collection(this.firedb, `users/${currentArtist.uid}/files`)
      // }
      // )
    })
    }



  private saveFileData(fileRt: Partial<FileUpload>){

  }


  getFiles(user:Artist) {
    const dbRef = collection(this.firedb, `${this.basePath}/${user.uid}/user`);
    console.log(user);
    return collectionData(dbRef, {idField: 'id'});
    };


  deleteFile(fileUpload: DocumentData, currentArtist: Artist): void {
    const dbRef = ref(this.db, `${this.basePath}/${currentArtist.uid}/user`);
    remove(dbRef)
      .then(() => {
        const storageRef = StorageRef(this.storage, `${this.basePath}/${currentArtist.uid}/user/${fileUpload['name']}`);
        deleteObject(storageRef);

      })
      .catch((error) => {
        console.log(error);
      });
  }
}
