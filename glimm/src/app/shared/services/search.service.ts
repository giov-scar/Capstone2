import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { Observable, catchError, map, of } from 'rxjs';
import { Artist } from 'src/app/classes/artist';
import { IWork } from '../work';

export interface SearchResult {
  artists: Artist[];
  works: IWork[];
}

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  constructor(private http: HttpClient, private fileUploadService: FileUploadService) { }

  search(query: string): Observable<{ artists: Artist[], works: IWork[] }> {
    if (!query.trim()) {
      // Se non c'è una query, restituisci un risultato vuoto.
      return of({ artists: [], works: [] });
    }

    const url = `https://glimm-6e33c-default-rtdb.europe-west1.firebasedatabase.app/users.json`;
    return this.http.get<{ [key: string]: Artist }>(url).pipe(
      map(users => {
        const artists: Artist[] = [];
        const works: IWork[] = [];
        const lowerCaseQuery = query.trim().toLowerCase();

        for (const userId in users) {
          if (users.hasOwnProperty(userId)) {
            const artist = users[userId];
            // Verifica se l'artista o il cognome dell'artista corrisponde alla query
            if (
              artist.artistname && artist.artistname.toLowerCase().includes(lowerCaseQuery) ||
              artist.artistsurname && artist.artistsurname.toLowerCase().includes(lowerCaseQuery)
            ) {
              artists.push(artist);
            }

            // Verifica se esistono lavori caricati
            if (artist.uploadedWork) {
              Object.values(artist.uploadedWork).forEach((work: IWork) => {
                // Verifica se il titolo o la descrizione del lavoro corrispondono alla query
                if (
                  work.title && work.title.trim().toLowerCase().includes(lowerCaseQuery) ||
                  work.description && work.description.trim().toLowerCase().includes(lowerCaseQuery)
                ) {
                  works.push(work);
                }
              });
            }
          }
        }

        return { artists, works };
      }),
      catchError(error => {
        console.error('Errore durante la ricerca', error);
        return of({ artists: [], works: [] });
      })
    );
  }




}
