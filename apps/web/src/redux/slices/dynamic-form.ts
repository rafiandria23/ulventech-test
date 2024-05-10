import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DynamicFormState } from '../../interfaces/dynamic-form';
import { fetchFields, submitFields } from '../thunks/dynamic-form';

const initialState: DynamicFormState = {
  loading: false,
  fields: [],
};

const paymentSlice = createSlice({
  name: 'dynamicForm',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFields.fulfilled, (state, action) => {
        state.fields = [...action.payload];
      })
      .addMatcher(
        isAnyOf(fetchFields.pending, submitFields.pending),
        (state) => {
          state.loading = true;
        },
      )
      .addMatcher(
        isAnyOf(
          fetchFields.fulfilled,
          fetchFields.rejected,
          submitFields.fulfilled,
          submitFields.rejected,
        ),
        (state) => {
          state.loading = false;
        },
      );
  },
});

export default paymentSlice.reducer;
