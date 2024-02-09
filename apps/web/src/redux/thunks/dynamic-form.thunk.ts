import { createAsyncThunk } from '@reduxjs/toolkit';

import { IRootState } from '../../types/redux.type';
import {
  IDynamicFormField,
  DynamicFormPayload,
} from '../../types/dynamic-form.type';
import ApiClient from '../../clients/api.client';

const apiClient = new ApiClient();

export const fetchFields = createAsyncThunk<
  IDynamicFormField[],
  void,
  { state: IRootState }
>('dynamicForm/fetchFields', async (__: void) => {
  const fields = await apiClient.fetchFields();

  return fields;
});

export const submitFields = createAsyncThunk<
  string,
  DynamicFormPayload,
  { state: IRootState }
>('dynamicForm/submitFields', async (payload) => {
  return await apiClient.submitFields(payload);
});
