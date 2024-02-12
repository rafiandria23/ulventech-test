'use client';

import type { FC, ReactNode } from 'react';
import { memo } from 'react';
import { Provider } from 'react-redux';

// Redux
import store from '../redux';

export interface IReduxProviderProps {
  children: ReactNode;
}

const ReduxProvider: FC<IReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default memo(ReduxProvider);
