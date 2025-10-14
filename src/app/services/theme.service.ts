import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkMode = false;

  constructor() {
    const savedMode = localStorage.getItem('darkMode');
    this.isDarkMode = savedMode === 'true';
    this.updateBodyClass();
  }

  toggleMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.updateBodyClass();
  }

  isDark(): boolean {
    return this.isDarkMode;
  }

  private updateBodyClass(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  //   /**
  //    * Switch mode
  //    */
  //   switchMode(): void {
  //     this._themeService.toggleMode();
  //     this.isDarkMode.set(this._themeService.isDark());
  //   }
}
