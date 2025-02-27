import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLangSubject = new BehaviorSubject<string>('pl');
  currentLang$ = this.currentLangSubject.asObservable();

  private availableLangs = [
    { code: 'pl', name: 'Polski' },
    { code: 'en', name: 'English' }
  ];

  constructor(private translate: TranslateService) {
    // Initialize from localStorage if available
    const savedLang = localStorage.getItem('preferredLanguage');
    
    if (savedLang && this.isValidLanguage(savedLang)) {
      this.setLanguage(savedLang);
    } else {
      // Use browser language or default to Polish
      const browserLang = translate.getBrowserLang();
      const defaultLang = browserLang && this.isValidLanguage(browserLang) ? browserLang : 'pl';
      this.setLanguage(defaultLang);
    }
  }

  getAvailableLanguages() {
    return this.availableLangs;
  }

  getCurrentLang() {
    return this.currentLangSubject.value;
  }

  setLanguage(lang: string) {
    if (this.isValidLanguage(lang)) {
      this.translate.use(lang);
      localStorage.setItem('preferredLanguage', lang);
      this.currentLangSubject.next(lang);
    }
  }

  private isValidLanguage(lang: string): boolean {
    return this.availableLangs.some(l => l.code === lang);
  }
}
