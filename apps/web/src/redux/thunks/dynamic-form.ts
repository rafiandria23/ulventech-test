import { createAsyncThunk } from '@reduxjs/toolkit';

import type { DynamicFormPayload } from '../../types/dynamic-form';
import type { DynamicFormField } from '../../interfaces/dynamic-form';
import type { RootState } from '../../interfaces/redux';
import ApiClient from '../../clients/api';

const apiClient = new ApiClient();

export const fetchFields = createAsyncThunk<
  DynamicFormField[],
  void,
  { state: RootState }
>('dynamicForm/fetchFields', async (__: void) => {
  const fields = await apiClient.fetchFields();

  return fields;
});

export const submitFields = createAsyncThunk<
  string,
  DynamicFormPayload,
  { state: RootState }
>('dynamicForm/submitFields', async (payload) => {
  return await apiClient.submitFields(payload);
});
