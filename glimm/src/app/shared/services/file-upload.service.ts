import { Injectable } from '@angular/core';
import { Database, getDatabase, ref, remove } from '@angular/fire/database';
import { Storage, ref as StorageRef,  deleteObject, getDownloadURL } from '@angular/fire/storage';
import { uploadBytes } from '@angular/fire/storage';
import { FileUpload } from 'src/app/models/file-upload.model';
import { DocumentData, Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, doc,deleteDoc } from 'firebase/firestore';
import { child, update } from 'firebase/database';
import { Artist } from 'src/app/classes/artist';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private basePath = '/upload';
  fileUploads: any;
  uploadProgress$ = new Subject<number>();

  constructor(private db: Database, private storage: Storage, private firestore: Firestore) {}

  pushFileToStorage(newPost:Partial<FileUpload>, currentArtist:Artist){
    const filePath = `${this.basePath}/${currentArtist.uid}/user/${newPost.file?.name}`;
    const storageRef = StorageRef(this.storage, filePath);
    uploadBytes(storageRef, newPost.file as File).then(res => {
      console.log(res);
      return getDownloadURL (storageRef)
    }).then(url => {
      const dbCollection = collection(this.firestore, `${this.basePath}/${currentArtist.uid}/user`)
      addDoc(dbCollection, {name:newPost.file?.name, url})
    }).then(() => {
      this.uploadProgress$.next(100);
    });
    }



  // private saveFileData(fileRt: Partial<FileUpload>){

  // }


  getFiles(user:Artist) {
    const dbRef = collection(this.firestore, `${this.basePath}/${user.uid}/user`);
    console.log(user);
    return collectionData(dbRef, {idField: 'id'});
    };

    async getDownloadURL(fileName: string, currentArtist: Artist): Promise<string | null> {
      const fileStorageRef = StorageRef(this.storage, `
        ${this.basePath}/${currentArtist.uid}/user/${fileName}
`);

      try {
        return await getDownloadURL(fileStorageRef);
      } catch (error) {
        return null;
      }
    }

    async deleteFile(fileUpload: DocumentData, currentArtist: Artist) {
      try {
        // Elimina il file dal Cloud Storage.
        const storageRef = StorageRef(this.storage, `${this.basePath}/${currentArtist.uid}/user/${fileUpload['name']}`);
        deleteObject(storageRef);

        // Elimina il riferimento al file da Cloud Firestore.
        await deleteDoc(doc(this.firestore, `${this.basePath}/${currentArtist.uid}/user/${fileUpload['id']}`));

        console.log('File eliminato con successo.');
      } catch (error) {
        // Gestisci l'errore.
      }
    }

  }
