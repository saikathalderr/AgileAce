import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CreateRoom from '../components/createRoom';
import { Player } from '@lottiefiles/react-lottie-player';

function CreateRoomPage() {
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
            justifyContent='center'
            alignItems='center'
            style={{
              height: '100%',
            }}
          >
            <CreateRoom />
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={0} md={6}>
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            backgroundColor: '#F2F7FC',
            position: 'relative',
          }}
        >
          <Player
            autoplay
            loop
            src={'assets/117772-client-meeting.json'}
            style={{ width: '100%', position: 'absolute', bottom: 0 }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default CreateRoomPage;
