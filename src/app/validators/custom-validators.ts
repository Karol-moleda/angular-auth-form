import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static emailPattern(control: AbstractControl): { [key: string]: boolean } | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(control.value) ? null : { invalidEmail: true };
  }

  static emailMatch(emailControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const formGroup = control.parent;
      if (formGroup) {
        const emailControl = formGroup.get(emailControlName);
        if (emailControl && control.value !== emailControl.value) {
          return { emailMismatch: true };
        }
      }
      return null;
    };
  }
}
