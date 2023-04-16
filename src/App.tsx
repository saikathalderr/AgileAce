import LogoSvg from './assets/AgileAce.svg';
import appAnimation from './lottiefiles/84726-business-meeting-animation.json';
import { Player } from '@lottiefiles/react-lottie-player';
import { Button, Divider, Grid, Typography, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              width: '100%',
              height: '100vh',
            }}
          >
            <Grid
              display='flex'
              justifyContent='end'
              alignItems='center'
              style={{
                height: '100%',
              }}
            >
              <div>
                <Typography
                  variant='h3'
                  component='div'
                  sx={{
                    flexGrow: 1,
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <img src={LogoSvg} alt='agile-ace-logo' width={80} />
                  <b
                    style={{
                      color: '#2DA0D2',
                    }}
                    data-test-id='appName'
                  >
                    AgileAce
                  </b>
                </Typography>

                <Typography variant='h3' gutterBottom sx={{ my: 3 }}>
                  <b>
                    Scrum Poker for <br /> agile development <br /> teams
                  </b>
                </Typography>

                <Typography variant='subtitle1' gutterBottom>
                  Efficiently estimate project tasks with a user-friendly <br /> Scrum
                  Poker dashboard.
                </Typography>

                <Divider style={{ margin: '30px 0' }} />

                <Stack spacing={2} direction='row'>
                  <Button
                    variant='contained'
                    color='primary'
                    component={Link}
                    to={'/create-room'}
                  >
                    Create room
                  </Button>
                  <Divider orientation='vertical' flexItem />
                  <Button
                    variant='text'
                    color='primary'
                    component={Link}
                    to={'/join-room'}
                  >
                    Join room
                  </Button>
                </Stack>
              </div>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              width: '100%',
              height: '100vh',
            }}
          >
            <Grid
              display='flex'
              justifyContent='start'
              alignItems='center'
              style={{
                height: '100%',
              }}
            >
              <Player
                autoplay
                loop
                src={appAnimation}
                style={{ width: '80%', marginLeft: -100 }}
              />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
