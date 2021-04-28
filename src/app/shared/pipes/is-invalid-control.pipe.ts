import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'isInvalidControl',
  pure: false
})
export class IsInvalidControlPipe implements PipeTransform {

  transform(control: AbstractControl): boolean {
    return control && control.invalid && (control.dirty || control.touched);
  }
}
