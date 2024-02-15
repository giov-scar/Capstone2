import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchResult, SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports:[ CommonModule, FormsModule ]
})
export class SearchComponent {
  searchResult!: SearchResult
  searchQuery = ''
  @ViewChild('searchInput') searchInput!: ElementRef

  constructor(private searchService: SearchService, private router: Router) { }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;

    if (this.searchQuery) {
      this.searchService.search(this.searchQuery).subscribe(result => {
        this.searchResult = result;
      });
    } else {
      this.searchResult = { artists: [], works: [] };
    }
  }




  goToArtist(artistId: string) {
    this.router.navigate(['/artist', artistId]);
    this.resetSearchInput();
  }

  goToWork(workId: string) {
    this.router.navigate(['/work', workId]);
    this.resetSearchInput();
  }

  private resetSearchInput() {
    this.searchQuery = '';
    this.searchResult = { artists: [], works: [] };
    if (this.searchInput && this.searchInput.nativeElement) {
      this.searchInput.nativeElement.value = '';
    }
  }

}
