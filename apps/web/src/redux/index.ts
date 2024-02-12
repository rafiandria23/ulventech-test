import { configureStore } from '@reduxjs/toolkit';

import { IRootState } from '../types/redux.type';
import dynamicFromSlice from './slices/dynamic-form.slice';

const store = configureStore<IRootState>({
  reducer: {
    dynamicForm: dynamicFromSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
