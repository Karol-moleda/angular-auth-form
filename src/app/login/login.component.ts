import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormErrorComponent } from "./components/form-error/form-error.component";
import { Router } from '@angular/router';

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
    FormErrorComponent
],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if already authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      this.router.navigate(['/home']);
      return;
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      patternEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validators: this.matchEmails('email', 'patternEmail')
    });
  }

  matchEmails(email: string, confirmEmail: string) {
    return (formGroup: FormGroup) => {
      const emailControl = formGroup.controls[email];
      const confirmEmailControl = formGroup.controls[confirmEmail];

      if (confirmEmailControl.errors && !confirmEmailControl.errors['emailMismatch']) {
        return;
      }

      if (emailControl.value !== confirmEmailControl.value) {
        confirmEmailControl.setErrors({ emailMismatch: true });
      } else {
        confirmEmailControl.setErrors(null);
      }
    };
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // Generate and store token
      const token = this.generateRandomToken();
      localStorage.setItem('authToken', token);
      
      // Redirect to home page - updated path
      this.router.navigate(['/home']);
    }
  }

  /**
   * Generates a random string to serve as auth token
   * @returns Random string token
   */
  private generateRandomToken(): string {
    // Generate a random string of 32 characters
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    
    for (let i = 0; i < 32; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return token;
  }
}
