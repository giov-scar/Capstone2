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
    return this.http.get<Artist>(url)
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

  addWorkToFavorites(userId: string, workId:string): Observable<any>{
    const userUrl = `https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`

    return this.http.get<Artist>(userUrl).pipe(
      map(user => {
        const updatedFavorites = user.favorites ? [...user.favorites, workId] : [workId]
        return { ...user, favorites: updatedFavorites}
      }),
      switchMap(updatedUser => this.http.put(userUrl, updatedUser)),
      catchError(error => {
        console.error('Errore durante l\'aggiunta ai preferiti', error);
        return throwError(error);
      })
    )
  }

  removeFavorite(userId: string, workId: string): Observable<any> {
    // URL per aggiornare l'utente
    const userUrl = `https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`;

    // Recupera prima il profilo utente, poi rimuovi il lavoro dai preferiti e aggiorna
    return this.getUserProfile(userId).pipe(
      switchMap(user => {
        const updatedFavorites = user.favorites.filter(id => id !== workId);
        return this.http.put(userUrl, { ...user, favorites: updatedFavorites });
      }),
      catchError(error => {
        console.error('Errore durante la rimozione del lavoro dai preferiti', error);
        return throwError(error);
      })
    );
  }


  getFavorites(userId: string): Observable<IWork[]> {
    const userProfileUrl = `https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`;

    return this.http.get<Artist>(userProfileUrl).pipe(
      map(user => user.favorites || []),
      switchMap(favoriteWorkIds => {
        if (favoriteWorkIds.length === 0) {
          return of([]); // Se non ci sono preferiti, restituisci un array vuoto
        }
        this.favorites = new Set(favoriteWorkIds); // Aggiorna l'elenco locale dei preferiti
        const favoriteWorksRequests = favoriteWorkIds.map(workId =>
          this.http.get<IWork>(`https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/works/${workId}.json`)
            .pipe(catchError(() => of(null)))
        );
        return forkJoin(favoriteWorksRequests);
      }),
      map(worksArray => worksArray.filter(work => work !== null) as IWork[]),
      catchError(error => {
        console.error('Errore durante il recupero dei lavori preferiti', error);
        return throwError(error);
      })
    );
  }

  isFavorite(workId: string): boolean {
    return this.favorites.has(workId);
  }

  updateUserProfile(userId: string, updatedUser: Artist): Observable<any> {
    const url = `https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`;
    return this.http.put(url, updatedUser);
  }


}
