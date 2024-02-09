import { FC, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider, CssBaseline } from '@mui/material';

import '../styles/global.scss';

import theme from '../styles/theme';

const ReduxProvider = dynamic(
  () => import('../components/ReduxProvider.component'),
  {
    ssr: false,
  },
);

export interface IRootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<IRootLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <ReduxProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />

              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;

export const metadata = {
  title: 'Ulventech Test',
  description: 'Test for Ulventech.',
};
