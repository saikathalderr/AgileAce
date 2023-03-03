import {
  AppBar,
  Button,
  IconButton,
  Typography,
  Toolbar,
  Tooltip,
  Stack,
  Snackbar,
} from '@mui/material';
import { Close, Logout, Menu, Share } from '@mui/icons-material';
import HomeButton from './homeButton';
import { SyntheticEvent, useState } from 'react';

function Header({
  roomId,
  onLeave,
}: {
  roomId: string;
  onLeave: () => void;
}) {
  const [linkCopied, setLinkCopied] = useState<boolean>(false);

  const onShare = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    setLinkCopied(true);
  };

  const handleLinkCopySnakeBarClose = (
    event: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setLinkCopied(false);
  };

  const snakeBarAction = (
    <>
      <Button
        color='secondary'
        size='small'
        onClick={handleLinkCopySnakeBarClose}
      >
        UNDO
      </Button>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleLinkCopySnakeBarClose}
      >
        <Close fontSize='small' />
      </IconButton>
    </>
  );

  return (
    <>
      <AppBar
        position='static'
        sx={{ my: 10 }}
        elevation={0}
        color='inherit'
      >
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
              variant='contained'
              endIcon={<Share />}
              onClick={onShare}
            >
              Share Room
            </Button>
            <Tooltip title='Leave Room' placement='right'>
              <IconButton
                aria-label='delete'
                onClick={onLeave}
                color='error'
              >
                <Logout />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={linkCopied}
        onClose={handleLinkCopySnakeBarClose}
        autoHideDuration={6000}
        message='Link copied!'
        action={snakeBarAction}
      />
    </>
  );
}

export default Header;
