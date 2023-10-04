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

}
