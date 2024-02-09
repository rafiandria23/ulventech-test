'use client';

import { FC, ReactNode, memo } from 'react';
import { SnackbarProvider } from 'notistack';

export interface INotistackProviderProps {
  children: ReactNode;
}

const NotistackProvider: FC<INotistackProviderProps> = ({ children }) => {
  return <SnackbarProvider>{children}</SnackbarProvider>;
};

export default memo(NotistackProvider);
