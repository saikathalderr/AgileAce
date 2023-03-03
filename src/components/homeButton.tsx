import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function HomeButton() {
  const navigate = useNavigate();

  return (
    <Tooltip title='Home' placement='top'>
      <IconButton
        aria-label='delete'
        size='large'
        color='primary'
        onClick={() => navigate('/')}
        data-testid='homeButton'
      >
        <Home data-testid='homeIcon' />
      </IconButton>
    </Tooltip>
  );
}

export default HomeButton;
