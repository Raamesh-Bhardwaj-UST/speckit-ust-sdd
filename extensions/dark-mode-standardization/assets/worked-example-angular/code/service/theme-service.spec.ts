import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme-service';

describe('ThemeService', () => {
  const storageKey = 'sentinel_mind_theme_mode';
  let matchMediaSpy: jasmine.Spy;

  beforeEach(() => {
    localStorage.removeItem(storageKey);
    document.documentElement.classList.remove('dark');
    matchMediaSpy = spyOn(window, 'matchMedia').and.returnValue({
      matches: false,
    } as MediaQueryList);
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    localStorage.removeItem(storageKey);
    document.documentElement.classList.remove('dark');
    TestBed.resetTestingModule();
  });

  it('restores a saved dark preference and applies it to the document root', () => {
    localStorage.setItem(storageKey, 'dark_mode');

    const service = TestBed.inject(ThemeService);

    expect(service.themeMode()).toBe('dark_mode');
    expect(document.documentElement.classList).toContain('dark');
    expect(matchMediaSpy).not.toHaveBeenCalled();
  });

  it('uses the system preference when there is no saved value', () => {
    matchMediaSpy.and.returnValue({ matches: true } as MediaQueryList);

    const service = TestBed.inject(ThemeService);

    expect(service.themeMode()).toBe('dark_mode');
    expect(document.documentElement.classList).toContain('dark');
    expect(localStorage.getItem(storageKey)).toBeNull();
  });

  it('ignores an invalid saved value and falls back to the system preference', () => {
    localStorage.setItem(storageKey, 'sepia');
    matchMediaSpy.and.returnValue({ matches: false } as MediaQueryList);

    const service = TestBed.inject(ThemeService);

    expect(service.themeMode()).toBe('light_mode');
    expect(document.documentElement.classList).not.toContain('dark');
  });

  it('persists an explicit toggle and synchronizes the document root', () => {
    const service = TestBed.inject(ThemeService);

    service.toggleTheme();
    expect(service.themeMode()).toBe('dark_mode');
    expect(localStorage.getItem(storageKey)).toBe('dark_mode');
    expect(document.documentElement.classList).toContain('dark');

    service.toggleTheme();
    expect(service.themeMode()).toBe('light_mode');
    expect(localStorage.getItem(storageKey)).toBe('light_mode');
    expect(document.documentElement.classList).not.toContain('dark');
  });
});
