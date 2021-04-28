import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  findFirstEmptyID(uniqueIDs: (string | number)[]): number {
    if (!uniqueIDs.length) {
      return;
    }
    let newID = 1;
    while (uniqueIDs.includes(newID)) {
      newID++;
    }
    return newID;
  }

  // unsupported formGroup.marksAsTouched() method for Angular versions < 8
  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
