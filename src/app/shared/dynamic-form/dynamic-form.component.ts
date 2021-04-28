import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '@app/states/form.service';
import { FormFieldType } from '@models/form-field-type.enum';
import { FormField } from '@models/form-field.interface';

@Component({
  selector: 'sl-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() formFields: FormField[] = [];
  @Input() formTitle = '';
  @Input() messageOnSubmit;
  @Input() isSaving = false;
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  formGroup: FormGroup;
  readonly FormFieldType = FormFieldType;

  constructor(private formService: FormService, private el: ElementRef, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.generateFormControls();
  }

  generateFormControls() {
    const group: { [key: string]: FormControl } = {};

    this.formFields.forEach(formField => {
      const newFormControl = new FormControl(null, formField.required ? Validators.required : null);
      group[formField.fieldName] = newFormControl;
    });

    this.formGroup = new FormGroup(group);
  }

  submit() {
    if (this.formGroup.invalid) {
      this.formService.markFormGroupTouched(this.formGroup);
      this.setFocusOnFirstInvalidControl();
      return;
    }
    const formValue = this.formGroup.getRawValue();
    this.submitForm.emit(formValue);
  }

  private setFocusOnFirstInvalidControl() {
    for (const key of Object.keys(this.formGroup.controls)) {
      if (this.formGroup.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[id="' + key + '"]');
        invalidControl.focus();
        this.changeDetectorRef.detectChanges();
        break;
      }
    }
  }
}
