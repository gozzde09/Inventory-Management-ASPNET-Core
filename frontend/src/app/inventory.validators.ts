import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class InventoryValidators {
  static nonNegative(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      control.value < 0 ? { nonNegative: true } : null;
  }

  static notZero(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      control.value === 0 ? { notZero: true } : null;
  }

  static digitsOnly(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      /^[0-9]+$/.test(control.value) ? null : { digitsOnly: true };
  }
}
