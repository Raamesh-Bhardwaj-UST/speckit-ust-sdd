import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

import { ThemeService } from '../../service/theme-service';

@Component({
  selector: 'app-toggle-theme',
  imports: [MatIconModule, MatTooltip],
  templateUrl: './toggle-theme.html',
  styleUrl: './toggle-theme.css',
})
export class ToggleTheme {
  private themeService = inject(ThemeService);
  themeMode = this.themeService.themeMode;
  isDark = computed(() => this.themeMode() === 'dark_mode');
  buttonLabel = computed(() =>
    this.isDark() ? 'Switch to light mode' : 'Switch to dark mode'
  );
  iconName = computed(() => (this.isDark() ? 'light_mode' : 'dark_mode'));
  toggleTheme = () => this.themeService.toggleTheme();
}
