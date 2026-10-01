import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeService } from '../../service/theme-service';
import { ToggleTheme } from './toggle-theme';

describe('ToggleTheme', () => {
  let component: ToggleTheme;
  let fixture: ComponentFixture<ToggleTheme>;
  let toggleTheme: jasmine.Spy;

  beforeEach(async () => {
    toggleTheme = jasmine.createSpy('toggleTheme');
    await TestBed.configureTestingModule({
      imports: [ToggleTheme],
      providers: [
        {
          provide: ThemeService,
          useValue: { themeMode: signal('light_mode'), toggleTheme },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleTheme);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('exposes an accessible button that invokes the theme toggle', () => {
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement | null;

    expect(button).not.toBeNull();
    if (!button) {
      return;
    }

    expect(button.getAttribute('aria-label')).toBe('Switch to dark mode');
    expect(button.getAttribute('aria-pressed')).toBe('false');
    button.click();
    expect(toggleTheme).toHaveBeenCalled();
  });
});
