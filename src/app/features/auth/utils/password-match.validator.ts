import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
  const password = formGroup.get('password')?.value;
  const passwordConfirmed = formGroup.get('passwordConfirmed')?.value;
  if (password && passwordConfirmed && password !== passwordConfirmed) {
    return { passwordsMismatch: true };
  }
  return null;
};
