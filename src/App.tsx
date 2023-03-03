import { Link } from 'react-router-dom';
import {
  Button,
  Divider,
  Grid,
  Typography,
  Stack,
} from '@mui/material';
import Box from '@mui/material/Box';

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
                  sx={{ flexGrow: 1, color: 'primary.main' }}
                >
                  <b data-test-id='appName'>AgileAce</b>
                </Typography>

                <Typography variant='h3' gutterBottom sx={{ my: 3 }}>
                  <b>
                    Scrum Poker for <br /> agile development <br />{' '}
                    teams
                  </b>
                </Typography>

                <Typography variant='subtitle1' gutterBottom>
                  Efficiently estimate project tasks with a
                  user-friendly <br /> Scrum Poker dashboard.
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
              <img
                src='assets/undraw_playing_cards_cywn.svg'
                style={{ width: '50%' }}
                alt='bg'
              />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
