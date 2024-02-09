'use client';

import { FC, memo, useMemo } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

import {
  DynamicFormPayload,
  IDynamicFormField,
} from '../types/dynamic-form.type';

export interface IDynamicFormProps {
  loading: boolean;
  fields: IDynamicFormField[];
}

const DynamicForm: FC<IDynamicFormProps> = ({ loading, fields }) => {
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
            required: {
              value: true,
              message: 'Cannot be empty!',
            },
          }}
          render={({ field }) => {
            return (
              <TextField
                type={formField.type}
                name={field.name}
                label={field.name}
                placeholder={field.name}
                defaultValue={formField.value}
                multiline={formField.type === 'multiline'}
                rows={5}
                select={formField.type === 'select'}
                onChange={field.onChange}
                onBlur={field.onBlur}
              >
                {formField.options?.map((option) => (
                  <MenuItem
                    key={`${formField.fieldName}-${option}`}
                    value={option}
                  >
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            );
          }}
        />
      );
    });
  }, [loading, fields, control]);

  return <>{formFields}</>;
};

export default memo(DynamicForm);
