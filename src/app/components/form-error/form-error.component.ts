import { Component, Input, inject, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent implements OnChanges {
  @Input() control!: AbstractControl | FormControl | null;
  @Input() errorMessages: { [key: string]: string } = {};

  private translateService = inject(TranslateService);

  private errorMessageKeys: { [key: string]: string } = {
    required: 'ERRORS.REQUIRED',
    email: 'ERRORS.EMAIL',
    invalidEmail: 'ERRORS.INVALID_EMAIL',
    emailMismatch: 'ERRORS.EMAIL_MISMATCH'
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['control'] && this.control) {
      // Możemy tu dodać dodatkową logikę jeśli potrzeba
    }
  }

  shouldShowErrors(): boolean {
    return this.control ? this.control.invalid && (this.control.dirty || this.control.touched) : false;
  }

  getErrorList(): string[] {
    if (!this.control || !this.control.errors) return [];
    
    return Object.keys(this.control.errors)
      .map(errorKey => {
        if (this.errorMessages[errorKey]) {
          return this.errorMessages[errorKey];
        }
        
        const translationKey = this.errorMessageKeys[errorKey] || `ERRORS.${errorKey.toUpperCase()}`;
        return this.translateService.instant(translationKey);
      });
  }
}
