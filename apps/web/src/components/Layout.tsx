'use client';

import type { FC } from 'react';
import { ReactNode, memo } from 'react';
import { useTheme, Stack } from '@mui/material';

import Header from './Header';

export interface LayoutProps {
  loading?: boolean;
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ loading, children }) => {
  const theme = useTheme();

  return (
    <>
      <Header loading={loading} />

      <Stack
        component='main'
        minHeight='100vh'
        sx={{
          '& > :first-of-type': {
            mb: theme.spacing(4),
            pt: {
              xs: `calc(${Number(
                theme.mixins.toolbar.minHeight,
              )}px + ${theme.spacing(4)})`,
              xl: `calc(${Number(
                theme.mixins.toolbar.minHeight,
              )}px + ${theme.spacing(8)})`,
            },
          },
          '& > *:not(:first-of-type)': {
            mb: theme.spacing(4),
          },
          '& > *': {
            width: '100%',
            height: '100%',
            py: {
              xs: theme.spacing(4),
              xl: theme.spacing(8),
            },
          },
          overflowX: 'hidden',
        }}
      >
        {children}
      </Stack>
    </>
  );
};

export default memo(Layout);
