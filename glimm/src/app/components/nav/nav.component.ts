import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbCollapseModule,NgbDropdownModule, NgbNavModule, } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { Observable, from } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Artist } from 'src/app/classes/artist';
import { SearchComponent } from '../search/search.component';


@Component({
  selector: 'app-nav',
  standalone: true,
	imports: [NgbCollapseModule, RouterLink, NgbDropdownModule, NgbNavModule, CommonModule, SearchComponent],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})

export class NavComponent {
  isMenuCollapsed = true;
  isDropdownOpen = false;
  isMobileMenuOpen = false;

  isDarkTheme$!: Observable<boolean>

  isLoggedIn!: boolean;
  artistData: Artist | null = null;
  uid: string | null = null;

  constructor(private themeService: ThemeService, private authService: AuthService,private userService: UserService) {
    this.isDarkTheme$ = from(this.themeService.isDarkTheme());

    this.authService.isLogged.subscribe((value) => {
      this.isLoggedIn = value;
      this.checkLoginStatus()
    })
  }

  @ViewChild('menuToggle')
  menuToggle!: ElementRef<HTMLInputElement>;
  @ViewChild('dropCheckbox')
  dropCheckbox!: ElementRef<HTMLInputElement>;


  checkLoginStatus() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser && parsedUser.uid) {
        this.uid = parsedUser.uid;
        if(this.uid){
          this.loadUserProfile(this.uid);
        }
      }
    }
  }


  loadUserProfile(uid:string) {
    this.userService.getUserProfile(uid).subscribe(
      userProfile => {
        this.artistData = userProfile;
        console.log(this.artistData);
      },
      error => console.error('Errore durante il recupero del profilo utente', error)
    );
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.isDropdownOpen = false;
    if (this.menuToggle.nativeElement) {
      this.menuToggle.nativeElement.checked = this.isMobileMenuOpen;
    }
  }

  toggleMenu() {
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
      if (this.dropCheckbox.nativeElement) {
        this.dropCheckbox.nativeElement.checked = false;
      }
    }
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.isMenuCollapsed = !this.isMobileMenuOpen;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectMenuItem() {
    this.isDropdownOpen = false;
  }

closeMenu() {
  this.isMenuCollapsed = true;
  if (this.menuToggle.nativeElement) {
    this.menuToggle.nativeElement.checked = false;
  }
  if (this.dropCheckbox.nativeElement) {
    this.dropCheckbox.nativeElement.checked = false;
  }
}

  toggleTheme() {
    this.themeService.toggleDarkMode();
  }

  isDarkTheme(): Observable<boolean> {
    return this.themeService.isDarkTheme();
  }


}

