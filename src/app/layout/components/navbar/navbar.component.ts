import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../../services/theme.service';
import { SearchComponent } from '../../../components/search/search.component';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MatIconModule, SearchComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isOpen = false;
  isDarkMode = signal<boolean>(false);

  constructor(private _themeService: ThemeService) {}

  /**
   * Toggle menu
   */
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  /**
   * Switch mode
   */
  switchMode(): void {
    this._themeService.toggleMode();
    this.isDarkMode.set(this._themeService.isDark());
  }
}
