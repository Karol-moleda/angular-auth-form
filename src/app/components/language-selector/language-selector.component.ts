import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule, TranslateModule],
  template: `
    <button mat-button [matMenuTriggerFor]="languageMenu" class="lang-button">
      <mat-icon>language</mat-icon>
      {{ currentLang === 'pl' ? 'Polski' : 'English' }}
    </button>
    <mat-menu #languageMenu="matMenu">
      <button mat-menu-item *ngFor="let lang of availableLanguages" (click)="changeLanguage(lang.code)">
        {{ lang.name }}
      </button>
    </mat-menu>
  `,
  styles: [`
    .lang-button {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class LanguageSelectorComponent implements OnInit {
  currentLang = 'pl';
  availableLanguages: { code: string; name: string }[] = [];

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
    
    this.availableLanguages = this.languageService.getAvailableLanguages();
  }

  changeLanguage(langCode: string): void {
    this.languageService.setLanguage(langCode);
  }
}
