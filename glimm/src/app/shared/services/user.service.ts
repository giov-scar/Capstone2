import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError, switchMap } from 'rxjs';
import { Artist } from 'src/app/classes/artist';
import { IWork } from '../work';
import { FileUploadService } from './file-upload.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private fileUploadService: FileUploadService) { }

  getUserProfile(uid:string):Observable<Artist>{
    const url = `https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`
    return this.http.get<Artist>(url).pipe(
      catchError(error => {
        console.error(`Errore durante il recupero dei dettagli dell'utente con UID ${uid}`, error);
        return throwError(error);
      })
    )
  }

  getWorksByUser(uid: string): Observable<IWork[]> {
    return this.http.get<{ [workId: string]: IWork }>(
      `https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/uploadedWork.json`
    ).pipe(
      map(uploadedWorks => {
        const worksArray =  Object.values(uploadedWorks || {}).filter(work => work.id && work.id.startsWith('work_'));
        worksArray.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
      });
      return worksArray;
      }),
      catchError(error => {
        console.error('Errore durante il recupero dei lavori dell\'utente', error);
        return throwError(error);
      })
    );
  }

  updateWork(workId:string, updatedWork:IWork): Observable<any>{
    const url = `https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/users/${updatedWork.author}/uploadedWork/${workId}.json`;
    return this.http.put(url, updatedWork)
  }

  deleteWork(userId:string, workId:string): Observable<any>{
    const url = `https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/uploadedWork/${workId}.json`;
    return this.http.delete(url)
  }

  updateUserProfile(userId: string, updatedUser: Artist): Observable<any> {
    const url = `https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`;
    return this.http.put(url, updatedUser);
  }

  addFavorite(userId: string, workId: string): Observable<any> {
    return this.getUserProfile(userId).pipe(
      map(user => {
        const now = new Date(); // Oggetto Date invece di stringa
        const updatedFavorites = user.favorites
          ? [...user.favorites, { id: workId, addedOn: now }]
          : [{ id: workId, addedOn: now }];
        return { ...user, favorites: updatedFavorites };
      }),
      switchMap(updatedUser => this.updateUserProfile(userId, updatedUser)),
      catchError(error => {
        console.error('Errore durante l\'aggiunta ai preferiti', error);
        return throwError(error);
      })
    );
  }



  removeFavorite(userId: string, workId: string): Observable<any> {
    return this.getUserProfile(userId).pipe(
      map(userProfile => {
        const updatedFavorites = userProfile.favorites
          ? userProfile.favorites.filter(favorite => favorite.id !== workId)
          : [];
        return { ...userProfile, favorites: updatedFavorites };
      }),
      switchMap(updatedUser => this.updateUserProfile(userId, updatedUser)),
      catchError(error => {
        console.error('Errore durante la rimozione dei preferiti', error);
        return throwError(error);
      })
    );
  }

  isWorkFavorite(userId: string, workId: string): Observable<boolean> {
    return this.getUserProfile(userId).pipe(
      map(userProfile => userProfile.favorites
        ? userProfile.favorites.some(fav => fav.id === workId)
        : false),
      catchError(error => {
        console.error('Errore durante la verifica dei preferiti', error);
        return of(false);
      })
    );
  }



  getWorkDetailById(workId: string): Observable<IWork | null> {
    const url = `https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/works/${workId}.json`;
    return this.http.get<IWork>(url).pipe(
      catchError(error => {
        console.warn(`Errore durante il recupero del lavoro con ID ${workId}`, error);
        return of(null); // Restituisci null per i lavori non trovati
      })
    );
  }

  getFavorites(userId: string): Observable<IWork[]> {
    return this.getUserProfile(userId).pipe(
      switchMap(user => {
        if (user.favorites && user.favorites.length > 0) {
          return this.fileUploadService.getWork().pipe(
            map(works => {
              const filteredWorks = works.filter(work => user.favorites.some(fav => fav.id === work.id));
              return filteredWorks.sort((a, b) => {
                const favAIndex = user.favorites.findIndex(fav => fav.id === a.id);
                const favBIndex = user.favorites.findIndex(fav => fav.id === b.id);
                return favBIndex - favAIndex;
              });
            })
          );
        } else {
          return of([]);
        }
      }),
      catchError(error => {
        console.error('Errore durante il recupero dei lavori preferiti', error);
        return throwError(error);
      })
    );
  }

updateProfilePicture(userId: string, newImageUrl: string): Observable<any>{
  const url = `https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`;
  return this.http.patch(url, {profile_picture: newImageUrl})
}

updateCoverImage(userId: string, newImageUrl: string): Observable<any>{
  const url = `https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`;
  return this.http.patch(url, {coverImg: newImageUrl})
}

updateIntroText(userId:string, newText:string):Observable<any>{
  const url = `https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`;
  return this.http.patch(url, {intro: newText})
}

updateEducation(userId:string, newBAText:string, newMAText:string):Observable<any>{
  const url = `https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`;
  return this.http.patch(url, {baCourse: newBAText, maCourse: newMAText})
}



}
