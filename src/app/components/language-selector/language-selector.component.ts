import {
  Component,
  OnInit,
  inject,
  signal,
  ChangeDetectionStrategy,
  DestroyRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../models/user.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      mat-button
      [matMenuTriggerFor]="languageMenu"
      class="lang-button"
      aria-label="Select language"
    >
      <mat-icon>language</mat-icon>
      {{ currentLang() === 'pl' ? 'Polski' : 'English' }}
    </button>
    <mat-menu #languageMenu="matMenu">
      @for (lang of availableLanguages(); track lang.code) {
        <button
          mat-menu-item
          (click)="changeLanguage(lang.code)"
          [attr.aria-label]="'Switch to ' + lang.name"
        >
          {{ lang.name }}
        </button>
      }
    </mat-menu>
  `,
  styles: [
    `
      .lang-button {
        display: flex;
        align-items: center;
        gap: 8px;
        height: 36px;
        line-height: 36px;
      }
    `,
  ],
})
export class LanguageSelectorComponent implements OnInit {
  private languageService = inject(LanguageService);
  private destroyRef = inject(DestroyRef);

  currentLang = signal<string>('pl');
  availableLanguages = signal<Language[]>([]);

  ngOnInit(): void {
    this.currentLang.set(this.languageService.getCurrentLang());
    this.availableLanguages.set(this.languageService.getAvailableLanguages());

    this.languageService.currentLang$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(lang => {
      this.currentLang.set(lang);
    });
  }

  /**
   * Changes the application language
   * @param langCode Language code to switch to
   */
  changeLanguage(langCode: string): void {
    this.languageService.setLanguage(langCode);
  }
}
