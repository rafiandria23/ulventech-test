import type { FC, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider, CssBaseline } from '@mui/material';

import '../styles/global.scss';
import theme from '../styles/theme';

const ReduxProvider = dynamic(() => import('../components/ReduxProvider'), {
  ssr: false,
});
const NotistackProvicer = dynamic(
  () => import('../components/NotistackProvider'),
  {
    ssr: false,
  },
);

export const metadata = {
  title: 'Ulventech Test',
  description: 'Test for Ulventech.',
};

export interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <ReduxProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />

              <NotistackProvicer>{children}</NotistackProvicer>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
