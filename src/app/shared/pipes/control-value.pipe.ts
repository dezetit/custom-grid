import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'getControlValue',
  pure: false
})
export class ControlValuePipe implements PipeTransform {

  transform(controlLabel: string, formGroup: FormGroup): AbstractControl {
    return formGroup.controls[controlLabel];
  }
}
