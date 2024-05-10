'use client';

import _ from 'lodash';
import type { FC } from 'react';
import { memo, useMemo } from 'react';
import { Stack, TextField, MenuItem } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import { isString } from 'tipe-apa';
import validator from 'validator';

import type { DynamicFormPayload } from '../types/dynamic-form';
import type { DynamicFormField } from '../interfaces/dynamic-form';

export interface DynamicFormProps {
  loading: boolean;
  fields: DynamicFormField[];
}

const DynamicForm: FC<DynamicFormProps> = ({ loading, fields }) => {
  const { control } = useFormContext<DynamicFormPayload>();

  const formFields = useMemo(() => {
    return fields.map((formField) => {
      return (
        <Controller
          key={formField.fieldName}
          control={control}
          disabled={loading}
          name={formField.fieldName}
          rules={{
            required: `${_.startCase(formField.fieldName)} cannot be empty!`,
            validate: (value) => {
              if (
                formField.type === 'email' &&
                !validator.isEmail(value as string)
              ) {
                return `${_.startCase(formField.fieldName)} is invalid!`;
              }

              return true;
            },
          }}
          render={({ field, fieldState }) => {
            return (
              <TextField
                disabled={field.disabled}
                type={formField.type}
                name={field.name}
                label={_.startCase(field.name)}
                placeholder={_.startCase(field.name)}
                defaultValue={formField.value}
                multiline={formField.type === 'multiline'}
                rows={5}
                select={formField.type === 'select'}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!fieldState.error || fieldState.invalid}
                helperText={fieldState.error?.message}
              >
                {formField.options?.map((option) => (
                  <MenuItem key={`${field.name}-${option}`} value={option}>
                    {isString(option) ? _.startCase(option) : option}
                  </MenuItem>
                ))}
              </TextField>
            );
          }}
        />
      );
    });
  }, [loading, fields, control]);

  return <Stack spacing={4}>{formFields}</Stack>;
};

export default memo(DynamicForm);
