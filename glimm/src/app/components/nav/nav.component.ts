import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbCollapseModule,NgbDropdownModule, NgbNavModule, } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { Observable, from, map } from 'rxjs';


@Component({
  selector: 'app-nav',
  standalone: true,
	imports: [NgbCollapseModule, RouterLink, NgbDropdownModule, NgbNavModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})

export class NavComponent {
  isMenuCollapsed = true;
  isDropdownOpen = false;
  isMobileMenuOpen = false;

  logoPathDark = '../../../assets/Logo_Glimm_white.png';
  logoPathLight = '../../../assets/Logo_Glimm.png';

  isDarkTheme$!: Observable<boolean>

  // logoPath$: Observable<string>

  constructor(private themeService: ThemeService) {
    this.isDarkTheme$ = from(this.themeService.isDarkTheme());
    // logoPath = this.themeService.isDarkTheme() ? this.logoPathDark : this.logoPathLight;
  }

  @ViewChild('menuToggle')
  menuToggle!: ElementRef<HTMLInputElement>;
  @ViewChild('dropCheckbox')
  dropCheckbox!: ElementRef<HTMLInputElement>;

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

