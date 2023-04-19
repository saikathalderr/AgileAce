import LogoSvg from './assets/AgileAce.svg';
import DemoSvg from './assets/demo.svg';
import { Button, Typography, Box } from '@mui/material';
import {Link} from "react-router-dom";

function App() {
  return (
    <>
      <div
        style={{
          padding: '70px 0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px',
          }}
        >
          <img src={LogoSvg} alt='agile-ace-logo' width={150} />
        </Box>
        <Box>
          <Typography
            variant='subtitle1'
            gutterBottom
            sx={{
              my: 3,
              textAlign: 'center',
              fontWeight: 900,
              lineHeight: 1,
              fontSize: '40px',
              color: '#35312B',
            }}
          >
            Scrum Poker <br /> for agile development teams
          </Typography>

          <Typography
            variant='subtitle1'
            gutterBottom
            sx={{
              my: 3,
              textAlign: 'center',
              fontWeight: 900,
              lineHeight: 1,
              fontSize: '15px',
              color: 'rgba(36, 36, 36, 0.4)',
            }}
          >
            Efficiently estimate project tasks with a user-friendlyScrum <br /> Poker
            dashboard.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            margin: '50px 0',
          }}
        >
          <Button variant='contained' size='large' component={Link} to={'/create-room'}>
            Try Agile Ace
          </Button>
          <Button component={Link} to={'/login'} variant='text' size='large'>
            Login
          </Button>
        </Box>
        <Box
          sx={{
            margin: '0 auto',
            position: 'relative',
            maxWidth: '1500px',
          }}
        >
          <img
            src={DemoSvg}
            alt='agile-ace-demo'
            style={{
              width: '100%'
            }}
          />
        </Box>
      </div>
    </>
  );
}

export default App;
