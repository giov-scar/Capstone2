import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from 'src/app/classes/artist';
import { SearchResult, SearchService } from 'src/app/shared/services/search.service';
import { IWork } from 'src/app/shared/work';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports:[ CommonModule ]
})
export class SearchComponent {
  searchResult!: SearchResult
  searchQuery = ''

  constructor(private searchService: SearchService, private router: Router) { }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;

    if (this.searchQuery) {
      this.searchService.search(this.searchQuery).subscribe(result => {
        this.searchResult = result; // searchResults deve essere di tipo SearchResult
      });
    } else {
      this.searchResult = { artists: [], works: [] }; // Inizializza con un oggetto SearchResult vuoto
    }
  }




  goToArtist(artistId: string) {
    this.router.navigate(['/artist', artistId]);
  }

  goToWork(workId: string) {
    this.router.navigate(['/work', workId]);
  }

}
