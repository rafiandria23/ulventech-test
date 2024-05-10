import type { DynamicFormField } from '../interfaces/dynamic-form';

export type DynamicFormPayload = Record<
  DynamicFormField[][number]['fieldName'],
  DynamicFormField[][number]['value']
>;
