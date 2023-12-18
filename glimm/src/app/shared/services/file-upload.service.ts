import { IWork } from './../work';
import { Injectable } from '@angular/core';
import { Database, getDatabase, ref } from '@angular/fire/database';
import { Storage,ref as StorageRef, deleteObject, getDownloadURL } from '@angular/fire/storage';
import { uploadBytes } from '@angular/fire/storage';
import { FileUpload } from 'src/app/models/file-upload.model';
import { DocumentData, Firestore, collectionData, orderBy, query } from '@angular/fire/firestore';
import { addDoc, collection, doc, arrayRemove, DocumentReference, updateDoc} from 'firebase/firestore';
import { Artist } from 'src/app/classes/artist';
import { Observable, Subject, catchError, map, throwError } from 'rxjs';
import { update } from 'firebase/database';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private basePath = '/upload';
  fileUploads: any;
  uploadProgress$ = new Subject<number>();
  usersData!: Observable<any>;

  constructor(
    // private db: Database,
    private storage: Storage,
    private firestore: Firestore,
    private db: Database,
    private http: HttpClient

  ) {}

  pushFileToStorage(newPost: Partial<FileUpload>, currentArtist: Artist): Promise<string> {
    return new Promise((resolve, reject) => {
        const filePath = `${this.basePath}/${currentArtist.uid}/user/${newPost.file?.name}`;
        const storageRef = StorageRef(this.storage, filePath);

        uploadBytes(storageRef, newPost.file as File)
            .then(() => getDownloadURL(storageRef))
            .then((downloadURL) => {
                this.uploadProgress$.next(100);
                resolve(downloadURL);
            })
            .catch((error) => {
                console.error("Errore nel caricamento del file:", error);
                reject(error);
            });
    });
}


  getFiles(user: Artist) {
    const dbRef = collection(
      this.firestore,
      `${this.basePath}/${user.uid}/user`
    );
    console.log(user);
    return collectionData(dbRef, { idField: 'id' });
  }

  async getDownloadURL(
    fileName: string,
    currentArtist: Artist
  ): Promise<string | null> {
    const fileStorageRef = StorageRef(
      this.storage,
      `
        ${this.basePath}/${currentArtist.uid}/user/${fileName}`
    );

    try {
      return await getDownloadURL(fileStorageRef);
    } catch (error) {
      return null;
    }
  }

  async deleteFile(fileUpload: FileUpload, currentArtist: Artist) {
    try {
      // Remove from Cloud Storage.
      const storageRef = StorageRef(
        this.storage,
        `${this.basePath}/${currentArtist.uid}/user/${fileUpload.file.name}`
      );
      deleteObject(storageRef);

      // Remove from Firestore.
      console.log(fileUpload);
      const fileRef = doc(
        this.firestore,
        `glimm/uploads/work/`
      );

      await updateDoc(fileRef, { photo: arrayRemove(`${fileUpload['url']}`) });

      console.log('File eliminato con successo.');
    } catch (error) {}
  }

  work!:IWork
  postWork(title: string, description: string, category: string[], photo: string[], currentArtist: Artist) {
    const author = currentArtist.uid;
    const database = getDatabase();
    const path = `/users/${author}/`;

    this.work = {
      title: title,
      description: description,
      photo: photo,
      category: category,
      author: author,
      createdAt: new Date()
    };

    if (!Array.isArray(currentArtist.uploadedWork)) {
      currentArtist.uploadedWork = []; // Inizializza come array vuoto se non è già un array
    }

    currentArtist.uploadedWork.push(this.work);
    console.log(currentArtist);
    return update(ref(database, path), currentArtist);
  }

  getWork(): Observable<IWork[]> {
    return this.http.get<{ [key: string]: any }>(
      `https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/users.json`
    ).pipe(
      map(users => {
        const worksArray: IWork[] = [];
        for (const userId in users) {
          if (users.hasOwnProperty(userId)) {
            const user = users[userId];
            if (user.uploadedWork && Array.isArray(user.uploadedWork) && user.uploadedWork.length > 1){
            for (let i = 1; i < user.uploadedWork.length; i++) {
              worksArray.push(user.uploadedWork[i]);
            }
          }
          }
        }
        console.log(worksArray);
        return worksArray;
      }),
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    );
  }


  async getWorkReference(
    workId: string
  ): Promise<DocumentReference<DocumentData>> {
    const workRef = doc(this.firestore, `glimm/uploads/work/${workId}`);
    return workRef;
  }
}
