import HomeButton from './homeButton';
import { Logout, Share } from '@mui/icons-material';
import {
  AppBar,
  Button,
  IconButton,
  Typography,
  Toolbar,
  Tooltip,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import { toast } from 'react-toastify';

function Header({ roomId, onLeave }: { roomId: string; onLeave: () => void }) {
  const onShare = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    toast('Link copied to clipboard!');
  };

  return (
    <>
      <AppBar position='static' sx={{ my: 5 }} elevation={0} color='inherit'>
        <Toolbar>
          <HomeButton />
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, px: 2, color: 'primary.main' }}
          >
            <b>AgileAce</b>
          </Typography>
          <Stack spacing={3} direction='row'>
            <Button
              variant='text'
              endIcon={<Share />}
              onClick={onShare}
              size='small'
              sx={{ px: 2 }}
            >
              Share Room
            </Button>
            <Tooltip title='Leave Room' placement='right'>
              <IconButton
                aria-label='delete'
                onClick={onLeave}
                color='error'
              >
                <Logout sx={{ width: 20, height: 20 }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
