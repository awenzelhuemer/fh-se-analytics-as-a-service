import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ValidationHelper {
    static getErrorMessage(control?: AbstractControl | null) {
        if (!control) {
            return null;
        }
        if (control.hasError('required')) {
            return 'Field is required.';
        } else if (control.hasError('email')) {
            return 'E-Mail is invalid.';
        }
        else {
            return '';
        }
    }
}