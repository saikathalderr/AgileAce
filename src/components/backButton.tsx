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
        data-testid='backButton'
      >
        <ArrowBack data-testid='arrowBackIcon' />
      </IconButton>
    </Tooltip>
  );
}

export default BackButton;
