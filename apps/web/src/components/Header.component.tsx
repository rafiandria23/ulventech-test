'use client';

import { FC, memo } from 'react';
import { AppBar, Toolbar, Typography, LinearProgress } from '@mui/material';

export interface IHeaderProps {
  loading?: boolean;
}

const Header: FC<IHeaderProps> = ({ loading }) => {
  return (
    <>
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
    </>
  );
};

export default memo(Header);
