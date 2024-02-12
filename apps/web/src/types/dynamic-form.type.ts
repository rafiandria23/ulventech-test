export interface IDynamicFormField<T = string | number> {
  type: 'select' | 'text' | 'multiline' | 'email' | 'number';
  fieldName: string;
  options?: T[];
  value: T;
}

export type DynamicFormPayload = Record<
  IDynamicFormField[][number]['fieldName'],
  IDynamicFormField[][number]['value']
>;

export interface IDynamicFormState {
  loading: boolean;
  fields: IDynamicFormField[];
}
