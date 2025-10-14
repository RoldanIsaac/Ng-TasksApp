import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor() {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public Methods
  // -----------------------------------------------------------------------------------------------------

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  getFormDataAsJson(formData: FormData): string {
    const formDataObj: { [key: string]: any } = {};

    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    return JSON.stringify(formDataObj);
  }

  validateFormControlValue(formControl: FormControl): boolean {
    const value = formControl?.value;
    return value !== null && value !== '' && value !== undefined;
  }
}
