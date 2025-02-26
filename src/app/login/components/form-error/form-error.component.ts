import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent {
  @Input() control!: AbstractControl | FormControl | null;
  @Input() errorMessages: { [key: string]: string } = {};

  // Default error messages
  private defaultErrorMessages: { [key: string]: string } = {
    required: 'This field is required',
    email: 'Please enter a valid email',
    invalidEmail: 'Please enter a valid email address',
    emailMismatch: 'Emails do not match'
  };

  shouldShowErrors(): boolean {
    return this.control ? this.control.invalid && (this.control.dirty || this.control.touched) : false;
  }

  getErrorList(): string[] {
    if (!this.control || !this.control.errors) return [];
    
    return Object.keys(this.control.errors)
      .map(errorKey => {
        // Use custom error message if provided, otherwise use default
        return this.errorMessages[errorKey] || this.defaultErrorMessages[errorKey] || `Error: ${errorKey}`;
      });
  }
}
