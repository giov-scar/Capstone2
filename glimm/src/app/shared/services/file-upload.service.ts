import { IWork } from './../work';
import { Injectable } from '@angular/core';
import { Database, getDatabase, ref } from '@angular/fire/database';
import { Storage,ref as StorageRef, deleteObject, getDownloadURL } from '@angular/fire/storage';
import { uploadBytes } from '@angular/fire/storage';
import { FileUpload } from 'src/app/models/file-upload.model';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, doc, arrayRemove, updateDoc} from 'firebase/firestore';
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
  private worksArray: IWork[] = []

  constructor(
    private storage: Storage,
    private firestore: Firestore,
    private db: Database,
    private http: HttpClient,
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
    const workId = this.generateUniqueId();

    this.work = {
      id: workId,
      title: title,
      description: description,
      photo: photo,
      category: category,
      author: author,
      createdAt: new Date()
    };

    const workPath = `/users/${author}/uploadedWork/${workId}`;

    // Aggiorna il database con il nuovo lavoro
    return update(ref(database, workPath), this.work);
  }


  generateUniqueId():string {
    return 'work_' + Math.random().toString(36).substring(2,9)
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
            const userProfilePicture = user.profile_picture
            const username = user.artistname
            const usersurname = user.artistsurname
            const intro = user.intro
            if (user.uploadedWork) {
              for (const workId in user.uploadedWork) {
                let work = user.uploadedWork[workId];

                // Aggiungi solo lavori che hanno un ID
                if (workId && workId.startsWith('work_') && workId !== '0' && work) {
                  work.id = workId;
                  work.profilePicture = userProfilePicture
                  work.artistName = username
                  work.artistSurname = usersurname
                  work.intro = intro
                  worksArray.push(work);
                }
              }
            }
          }
        }
        return worksArray;
      }),
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  setWorks(works: IWork[]): void {
    this.worksArray = works;
  }

  getWorkById(workId: string): Observable<IWork | undefined> {
  return this.getWork().pipe(
    map(works => works.find(work => work.id === workId))
  );
}

getWorksByCategory(category: string): Observable<IWork[]> {
  return this.getWork().pipe(
    map(works =>
      works
        .filter(work => work.category && work.category.includes(category))
        .sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        })
    )
  );
}




}
