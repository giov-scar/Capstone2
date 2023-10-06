import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private darkMode = false;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadTheme();
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    this.saveTheme();
    this.updateTheme();
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
  isDarkTheme(): boolean {
    return this.darkMode;
  }
}
