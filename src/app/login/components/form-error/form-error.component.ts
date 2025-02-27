import { Component, Input } from '@angular/core';
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
export class FormErrorComponent {
  @Input() control!: AbstractControl | FormControl | null;
  @Input() errorMessages: { [key: string]: string } = {};

  // Error message keys for translation
  private errorMessageKeys: { [key: string]: string } = {
    required: 'ERRORS.REQUIRED',
    email: 'ERRORS.EMAIL',
    invalidEmail: 'ERRORS.INVALID_EMAIL',
    emailMismatch: 'ERRORS.EMAIL_MISMATCH'
  };

  constructor(private translateService: TranslateService) {}

  shouldShowErrors(): boolean {
    return this.control ? this.control.invalid && (this.control.dirty || this.control.touched) : false;
  }

  getErrorList(): string[] {
    if (!this.control || !this.control.errors) return [];
    
    return Object.keys(this.control.errors)
      .map(errorKey => {
        // Use custom error message if provided
        if (this.errorMessages[errorKey]) {
          return this.errorMessages[errorKey];
        }
        
        // Use translated message
        const translationKey = this.errorMessageKeys[errorKey] || `ERRORS.${errorKey.toUpperCase()}`;
        return this.translateService.instant(translationKey);
      });
  }
}
