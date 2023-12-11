import { IWork } from './../work';
import { Injectable } from '@angular/core';
import { Database, getDatabase, push, ref } from '@angular/fire/database';
import { Storage,ref as StorageRef, deleteObject, getDownloadURL } from '@angular/fire/storage';
import { uploadBytes } from '@angular/fire/storage';
import { FileUpload } from 'src/app/models/file-upload.model';
import { DocumentData, Firestore, collectionData, orderBy, query } from '@angular/fire/firestore';
import { addDoc, collection, doc, arrayRemove, DocumentReference, updateDoc} from 'firebase/firestore';
import { Artist } from 'src/app/classes/artist';
import { Observable, Subject } from 'rxjs';
import { update } from 'firebase/database';

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
    private db: Database
  ) {}

  pushFileToStorage(newPost: Partial<FileUpload>, currentArtist: Artist) {
    const filePath = `${this.basePath}/${currentArtist.uid}/user/${newPost.file?.name}`;
    const storageRef = StorageRef(this.storage, filePath);
    uploadBytes(storageRef, newPost.file as File)
      .then((res) => {
        console.log(res);
        return getDownloadURL(storageRef);
      })
        // addDoc(dbCollection, { name: newPost.file?.name, url });
      .then(() => {
        this.uploadProgress$.next(100);
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

  async postWork(
    title: string,
    description: string,
    category: string[],
    photo: string[],
    currentArtist: Artist
  ): Promise<string | null> {
    const author = currentArtist.uid;
    const db = getDatabase();

    // Genera una nuova chiave univoca per il post
    const newPostKey = push(ref(db, `users/${author}/uploadedWork`)).key;

    const postData: IWork = {
      title: title,
      description: description,
      category: category,
      photo: photo,
      author: author,
      createdAt: new Date()

    };

    // Crea un oggetto per gli aggiornamenti da effettuare
    const updates: Partial<Record<string, IWork>> = {};
    updates[`users/${author}/uploadedWork/${newPostKey}`] = postData;
    updates[`posts/${newPostKey}`] = postData;

    try {
      await update(ref(db), updates);
      console.log("Lavoro aggiunto con successo");
      return newPostKey
    } catch (error) {
      console.error("Errore durante l'aggiunta del lavoro:", error);
      return null
    }
  }

  getWork(): Observable<DocumentData[]> {
    const dbRef = collection(this.firestore, `glimm/uploads/work`);
    const sortedQuery = query(
      dbRef,
      orderBy('createdAt', 'desc')
    )
    collectionData(sortedQuery, { idField: 'id' }).subscribe((val) => {
      console.log(val);
    });
    return (this.usersData = collectionData(dbRef, { idField: 'id' }));
  }

  async getWorkReference(
    workId: string
  ): Promise<DocumentReference<DocumentData>> {
    const workRef = doc(this.firestore, `glimm/uploads/work/${workId}`);
    return workRef;
  }
}
