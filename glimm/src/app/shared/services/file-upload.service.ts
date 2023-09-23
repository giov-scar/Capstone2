import { Injectable } from '@angular/core';
import { Database, ref, push, list, remove } from '@angular/fire/database';
import { Storage, ref as StorageRef, StorageReference, deleteObject, getDownloadURL } from '@angular/fire/storage';
import { uploadBytes } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FileUpload } from 'src/app/models/file-upload.model';
import { DocumentData, Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private basePath = '/upload';
  fileUploads: any;

  constructor(private db: Database, private storage: Storage, private firedb: Firestore) {}

  // pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
  //   const filePath = `${this.basePath}/${fileUpload.file.name}`;
  //   const storageRef = StorageRef(this.storage, filePath);
  //   const uploadTask = uploadBytes(storageRef, fileUpload.file);

  //   return new Observable<number | undefined>((observer) => {
  //     uploadTask
  //       .then((snapshot) => {
  //         getDownloadURL(storageRef).then((downloadURL) => {
  //           fileUpload.url = downloadURL;
  //           fileUpload.name = fileUpload.file.name;
  //           this.saveFileData(fileUpload);
  //           observer.complete();
  //         });
  //       })
  //       .catch((error) => {
  //         observer.error(error);
  //       });
  //   });
  // }

  pushFileToStorage(newPost:Partial<FileUpload>){
    const filePath = `${this.basePath}/${newPost.file?.name}`;
    const storageRef = StorageRef(this.storage, filePath);
    // const storageRef = ref(this.db, newPost.file?.name)
    uploadBytes(storageRef, newPost.file as File).then(res => {
      console.log(res);
      return getDownloadURL (storageRef)
    }).then(url => {
      const dbCollection = collection(this.firedb, `${this.basePath}`)
      addDoc(dbCollection, {name:newPost.file?.name, url})
    })
  }

  // private saveFileData(fileUpload: FileUpload): void {
  //   const dbRef = ref(this.db, this.basePath);
  //   push(dbRef, fileUpload);
  // }

  getFiles() {
    const dbRef = collection(this.firedb, this.basePath);
    return collectionData(dbRef, {idField: 'id'});
    };
    // console.log(ref);

    //  list(dbRef, (ref) => ref.limitToLast(numberItems));


  deleteFile(fileUpload: DocumentData): void {
    const dbRef = ref(this.db, `${this.basePath}`);
    remove(dbRef)
      .then(() => {
        const storageRef = StorageRef(this.storage, `${this.basePath}/${fileUpload['name']}`);
        deleteObject(storageRef);

      })
      .catch((error) => {
        console.log(error);
      });
  }
}
