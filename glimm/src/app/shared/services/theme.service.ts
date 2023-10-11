import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private darkMode = false;
  private darkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.darkMode)

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadTheme();
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    this.saveTheme();
    this.updateTheme();
    console.log('Toggled dark mode. Current mode:', this.darkMode);
  }


  private updateTheme(): void {
    if (this.darkMode) {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }

  private saveTheme(): void {
    localStorage.setItem('darkMode', this.darkMode ? '1' : '0');
  }

  private loadTheme(): void {
    const darkModeValue = localStorage.getItem('darkMode');
    if (darkModeValue === '1') {
      this.darkMode = true;
    }
  }
  isDarkTheme(): Observable<boolean> {
    return this.darkModeSubject.asObservable();
  }
}
