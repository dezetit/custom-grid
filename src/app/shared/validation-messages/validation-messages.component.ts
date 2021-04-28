import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'sl-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss']
})
export class ValidationMessagesComponent {
  @Input() formGroup: FormGroup;
  @Input() controlName: string;

  get control(): AbstractControl {
    return (this.formGroup && this.controlName) ? this.formGroup.get(this.controlName) : null;
  }
}
