import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFirebaseAuth } from '../firebase/context/auth.context';
import { Box, Chip, Divider, Grid, Typography } from '@mui/material';
import ToolBar from './ToolBar';
import { useState } from 'react';

export default function Auth() {
  const [signingIn, setSigningIn] = useState(false);
  const { signInWithGoogle } = useFirebaseAuth();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const callBackUrl = searchParams.get('callBackUrl') || '/';

  const handleSignInWithGoogle = async () => {
    setSigningIn(true)
    try {
      const user = await signInWithGoogle();
      if (user.uid) {
        setTimeout(() => {
          setSigningIn(false)
          navigate(callBackUrl)
        }, 2000);
      }
    } catch (error) {
      setSigningIn(false)
      console.error(error);
    }
  }
  return (
    <div style={{ width: '50%' }}>
      <Box
        sx={{
          width: '100%',
          mt: -5,
          pb: 3,
        }}
      >
        <ToolBar />
        <Typography variant='h5' gutterBottom data-testid='headingText'>
          <b>Login </b>
          <Typography variant='subtitle1'>
            please login to create a new room or join an existing room
          </Typography>
        </Typography>

        <Divider sx={{ my: 4 }}>
          <Chip label='Sign in' />
        </Divider>

        <Box>
          <Grid xs display='flex' alignItems='center' justifyContent='center'>
            <button
              type='button'
              className='login-with-google-btn'
              onClick={() => handleSignInWithGoogle()}
              disabled={signingIn}
            >
              { signingIn ? 'Signing in...' : 'Sign in with Google' }
            </button>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
