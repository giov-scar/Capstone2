import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbCollapseModule,NgbDropdownModule, NgbNavModule, } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-nav',
  standalone: true,
	imports: [NgbCollapseModule, RouterLink, NgbDropdownModule, NgbNavModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})

export class NavComponent {
  isMenuCollapsed = true;
  isDropdownOpen = false;
  isMobileMenuOpen = false;

  @ViewChild('menuToggle')
  menuToggle!: ElementRef<HTMLInputElement>;
  @ViewChild('dropCheckbox')
  dropCheckbox!: ElementRef<HTMLInputElement>;
binding: any;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.isDropdownOpen = false; // Chiude il menu a tendina su mobile quando si apre il menu principale
    if (this.menuToggle.nativeElement) {
      this.menuToggle.nativeElement.checked = this.isMobileMenuOpen;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeMenu() {
    this.isMobileMenuOpen = false;
    this.isDropdownOpen = false; // Chiude il menu a tendina su desktop quando si clicca su un elemento della lista
    this.isMenuCollapsed = true;
    if (this.menuToggle.nativeElement) {
      this.menuToggle.nativeElement.checked = false;
    }
  }


}
