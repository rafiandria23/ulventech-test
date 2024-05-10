'use client';

import type { FC } from 'react';
import { memo } from 'react';
import { AppBar, Toolbar, Typography, LinearProgress } from '@mui/material';

export interface HeaderProps {
  loading?: boolean;
}

const Header: FC<HeaderProps> = ({ loading }) => {
  return (
    <AppBar>
      <Toolbar>
        <Typography
          variant='h6'
          sx={{
            flexGrow: 1,
          }}
        >
          Dynamic Form
        </Typography>
      </Toolbar>

      {loading && <LinearProgress />}
    </AppBar>
  );
};

export default memo(Header);
