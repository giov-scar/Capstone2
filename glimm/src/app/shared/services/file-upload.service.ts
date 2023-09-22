import { Injectable } from '@angular/core';
import { Database, ref, push, list, remove } from '@angular/fire/database';
import { Storage, ref as StorageRef, deleteObject } from '@angular/fire/storage';
import { uploadBytes } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FileUpload } from 'src/app/models/file-upload.model';
import { AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private basePath = '/uploads';

  constructor(private db: Database, private storage: Storage) {}

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = StorageRef(this.storage, filePath);
    const uploadTask = uploadBytes(storageRef, fileUpload.file);

    return new Observable<number | undefined>((observer) => {
      uploadTask
        .then((snapshot) => {
          storageRef.getDownloadURL().then((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.saveFileData(fileUpload);
            observer.complete();
          });
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  private saveFileData(fileUpload: FileUpload): void {
    const dbRef = ref(this.db, this.basePath);
    push(dbRef, fileUpload);
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    const dbRef = ref(this.db, this.basePath);
    return list(dbRef, (ref) => ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload): void {
    const dbRef = ref(this.db, `${this.basePath}/${fileUpload.key}`);
    remove(dbRef)
      .then(() => {
        const storageRef = StorageRef(this.storage, `${this.basePath}/${fileUpload.name}`);
        deleteObject(storageRef);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
