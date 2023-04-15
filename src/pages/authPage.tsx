import { Player } from '@lottiefiles/react-lottie-player';
import authAnimation from '../lottiefiles/auth.json'
import Grid from '@mui/material/Grid';
import Auth from '../components/Auth';
import Box from '@mui/material/Box';

function AuthPage() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            width: '100%',
            height: '100vh',
          }}
        >
          <Grid
            xs
            display='flex'
            alignItems='center'
            justifyContent='center'
            data-testid='createRoomContainer'
            style={{
              height: '100%',
            }}
          >
            <Auth />
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={0} md={6}>
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            position: 'relative',
          }}
          data-testid='animationContainer'
        >
          <Player
            autoplay
            loop
            src={authAnimation}
            style={{ width: '100%', position: 'absolute', bottom: 0 }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default AuthPage;
