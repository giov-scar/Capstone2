import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbCollapseModule,NgbDropdownModule, NgbNavModule, } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { Observable, from } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Artist } from 'src/app/classes/artist';


@Component({
  selector: 'app-nav',
  standalone: true,
	imports: [NgbCollapseModule, RouterLink, NgbDropdownModule, NgbNavModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})

export class NavComponent implements OnInit {
  isMenuCollapsed = true;
  isDropdownOpen = false;
  isMobileMenuOpen = false;

  isDarkTheme$!: Observable<boolean>

  isLoggedIn!: boolean;
  artistData!: Artist;

  constructor(private themeService: ThemeService, private authService: AuthService,private userService: UserService) {
    this.isDarkTheme$ = from(this.themeService.isDarkTheme());

    this.authService.isLogged.subscribe((value) => {
      this.isLoggedIn = value;
    })
  }

  @ViewChild('menuToggle')
  menuToggle!: ElementRef<HTMLInputElement>;
  @ViewChild('dropCheckbox')
  dropCheckbox!: ElementRef<HTMLInputElement>;

  userUid = JSON.parse(localStorage['user']);
  uid = this.userUid[Object.keys(this.userUid)[0]];

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getUserProfile(this.uid).subscribe(
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

