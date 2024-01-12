import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, throwError, switchMap } from 'rxjs';
import { Artist } from 'src/app/classes/artist';
import { IWork } from '../work';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private favorites: Set<string> = new Set();
  constructor(private http: HttpClient) { }

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
        return Object.values(uploadedWorks || {}).filter(work => work.id && work.id.startsWith('work_'));
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
      map(userProfile => {
        const updatedFavorites = userProfile.favorites ? [...userProfile.favorites, workId] : [workId];
        return { ...userProfile, favorites: updatedFavorites };
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
        const updatedFavorites = userProfile.favorites ? userProfile.favorites.filter(id => id !== workId) : [];
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
      map(userProfile => userProfile.favorites ? userProfile.favorites.includes(workId) : false),
      catchError(error => {
        console.error('Errore durante la verifica dei preferiti', error);
        return of(false);
      })
    );
  }
  
  getWorkDetailById(workId: string): Observable<IWork> {
    const url = `https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/works/${workId}.json`;
    return this.http.get<IWork>(url).pipe(
      catchError(error => {
        console.error(`Errore durante il recupero del lavoro con ID ${workId}`, error);
        return throwError(error);
      })
    );
  }

  getFavorites(userId: string): Observable<IWork[]> {
    return this.getUserProfile(userId).pipe(
      switchMap(user => {
        if (user.favorites && user.favorites.length > 0) {
          // Richiedi i dettagli per ogni lavoro preferito
          const workDetailsRequests = user.favorites.map(workId => this.getWorkDetailById(workId));
          return forkJoin(workDetailsRequests);
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


}
