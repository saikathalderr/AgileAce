import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
    <Tooltip title='Back' placement='top'>
      <IconButton
        aria-label='delete'
        size='large'
        color='primary'
        onClick={() => navigate(-1)}
      >
        <ArrowBack />
      </IconButton>
    </Tooltip>
  );
}

export default BackButton;
