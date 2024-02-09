import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { IDynamicFormState } from '../../types/dynamic-form.type';
import { fetchFields, submitFields } from '../thunks/dynamic-form.thunk';

const initialState: IDynamicFormState = {
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
