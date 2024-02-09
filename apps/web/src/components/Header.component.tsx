'use client';

import { FC, memo } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header: FC = () => {
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
    </AppBar>
  );
};

export default memo(Header);
