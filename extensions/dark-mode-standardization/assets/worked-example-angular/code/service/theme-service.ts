import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

type ThemeMode = 'light_mode' | 'dark_mode';

const THEME_STORAGE_KEY = 'sentinel_mind_theme_mode';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  themeMode = signal<ThemeMode>('light_mode');

  constructor() {
    this.setTheme();
  }

  setTheme(): ThemeMode {
    const savedThemeMode = localStorage.getItem(THEME_STORAGE_KEY);
    const mode =
      savedThemeMode === 'light_mode' || savedThemeMode === 'dark_mode'
        ? savedThemeMode
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark_mode'
          : 'light_mode';

    this.applyTheme(mode);
    return mode;
  }

  toggleTheme(): void {
    const mode = this.themeMode() === 'dark_mode' ? 'light_mode' : 'dark_mode';
    this.applyTheme(mode);
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }

  private applyTheme(mode: ThemeMode): void {
    this.themeMode.set(mode);
    this.document.documentElement.classList.toggle('dark', mode === 'dark_mode');
  }
}
