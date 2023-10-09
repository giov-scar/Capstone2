import { Component } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {

  constructor(private themeService: ThemeService){}

  isDarkTheme(): boolean {
    const isDark = this.themeService.isDarkTheme();
    console.log('isDarkTheme:', isDark);
    return isDark;
  }

}
