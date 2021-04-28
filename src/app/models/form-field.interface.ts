import { FormFieldType } from '@models/form-field-type.enum';

export interface FormField {
  fieldName?: string;
  label?: string;
  type?: FormFieldType;
  required?: boolean;
  options?: {value: any, label: string}[];
}
