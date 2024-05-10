import { configureStore } from '@reduxjs/toolkit';

import type { RootState } from '../interfaces/redux';
import dynamicFromSlice from './slices/dynamic-form';

const store = configureStore<RootState>({
  reducer: {
    dynamicForm: dynamicFromSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
