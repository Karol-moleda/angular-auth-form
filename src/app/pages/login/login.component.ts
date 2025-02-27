import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormErrorComponent } from '../../components/form-error/form-error.component';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from '../../components/language-selector/language-selector.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormErrorComponent,
    TranslateModule,
    LanguageSelectorComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.router.navigate(['/home']);
      return;
    }

    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        patternEmail: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: this.matchEmails('email', 'patternEmail'),
      },
    );

    this.loginForm.get('email')?.valueChanges.subscribe(() => {
      if (this.loginForm.get('patternEmail')?.value) {
        this.loginForm.get('patternEmail')?.updateValueAndValidity();
      }
    });

    this.loginForm.get('patternEmail')?.valueChanges.subscribe(() => {
      this.loginForm.updateValueAndValidity();
    });
  }

  matchEmails(email: string, confirmEmail: string) {
    return (formGroup: FormGroup) => {
      const emailControl = formGroup.controls[email];
      const confirmEmailControl = formGroup.controls[confirmEmail];

      if (!confirmEmailControl.value) {
        return;
      }

      if (emailControl.value !== confirmEmailControl.value) {
        confirmEmailControl.setErrors({ ...confirmEmailControl.errors, emailMismatch: true });
      } else if (confirmEmailControl.errors?.['emailMismatch']) {
        const { emailMismatch, ...otherErrors } = confirmEmailControl.errors;
        confirmEmailControl.setErrors(Object.keys(otherErrors).length ? otherErrors : null);
      }
    };
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const token = this.generateRandomToken();
      localStorage.setItem('authToken', token);

      this.router.navigate(['/home']);
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  /**
   * Generates a random string to serve as auth token
   * @returns Random string token
   */
  private generateRandomToken(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';

    for (let i = 0; i < 32; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return token;
  }
}
