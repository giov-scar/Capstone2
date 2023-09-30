import { Injectable } from '@angular/core';
import { Database } from '@angular/fire/database';
import { Storage, ref as StorageRef,  deleteObject, getDownloadURL } from '@angular/fire/storage';
import { uploadBytes } from '@angular/fire/storage';
import { FileUpload } from 'src/app/models/file-upload.model';
import { DocumentData, Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, doc, deleteDoc , arrayRemove, DocumentReference, updateDoc} from 'firebase/firestore';
import { Artist } from 'src/app/classes/artist';
import { Observable, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private basePath = '/upload';
  fileUploads: any;
  uploadProgress$ = new Subject<number>();
  usersData!: Observable<any>

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


  getFiles(user:Artist) {
    const dbRef = collection(this.firestore, `${this.basePath}/${user.uid}/user`);
    console.log(user);
    return collectionData(dbRef, {idField: 'id'});
    };

    async getDownloadURL(fileName: string, currentArtist: Artist): Promise<string | null> {
      const fileStorageRef = StorageRef(this.storage, `
        ${this.basePath}/${currentArtist.uid}/user/${fileName}`);

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
        console.log(fileUpload);
        const fileRef = doc(this.firestore, `glimm/uploads/work/OYX112geceIR1hLV6VQ2/`)

        await updateDoc(fileRef, {photo: arrayRemove(`${fileUpload['url']}`)});

        console.log('File eliminato con successo.')
      } catch (error) {
      }
    }

    postWork(title: string, description: string, categories: string[], photo: string[], currentArtist: Artist) {
      const author = currentArtist.uid
      const work = {
        title,
        description,
        categories,
        photo,
        author
      };

      const workRef = collection(this.firestore, `glimm/uploads/work`);
      addDoc(workRef, work);
    }

    getWork(): Observable<DocumentData[]>{
      const dbRef = collection(this.firestore, `glimm/uploads/work`);
      collectionData(dbRef, { idField: 'id'}).subscribe(val => {
        console.log(val);
      })
      return this.usersData = collectionData(dbRef, { idField: 'id' })

    };

    async getWorkReference(workId: string): Promise<DocumentReference<DocumentData>> {
      const workRef = doc(this.firestore, `glimm/uploads/work/${workId}`);
      return workRef;
    }

    // async getWorkById(id: string): Promise<DocumentData | null> {
    //   const workRef = doc(this.firestore, `glimm/uploads/work/${id}`);
    //   const workSnapshot = await workRef.get();

    //   if (workSnapshot.exists) {
    //     return workSnapshot.data();
    //   } else {
    //     return null;
    //   }
    // }

    // getWorksByUser(userId: string): Observable<DocumentData[]> {
    //   const dbRef = collection(this.firestore, `glimm/uploads/work`).where('author', '==', userId);
    //   return collectionData(dbRef, {idField: 'id'});
    // }

    }





