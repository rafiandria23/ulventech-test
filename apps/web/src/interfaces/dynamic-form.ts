export interface DynamicFormField<T = string | number> {
  type: 'select' | 'text' | 'multiline' | 'email' | 'number';
  fieldName: string;
  options?: T[];
  value: T;
}

export interface DynamicFormState {
  loading: boolean;
  fields: DynamicFormField[];
}
