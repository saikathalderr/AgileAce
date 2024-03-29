import { GitHub } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        bottom: 0,
        position: 'fixed',
        background: '#FFF',
        width: '100%',
      }}
    >
      <Divider sx={{ mb: 1 }} />
      <Typography variant='subtitle1' sx={{ mb: 1 }} gutterBottom>
        Made with
        {' '}
        {/* <a href='https://reactjs.org/' target='_blank'>
          <b>React</b>
        </a>
        ,{' '}
        <a href='https://www.typescriptlang.org/' target='_blank'>
          <b>TypeScript</b>
        </a>
        ,{' '}
        <a href='https://firebase.google.com/' target='_blank'>
          <b>Firebase</b>
        </a>{' '}
        & */}
        ❤️ by{' '}
        <b>
          <a href='https://www.linkedin.com/in/saikathalderr/' target='_blank'>
            Saikat Halder
          </a>
        </b>{' '}
        - available on{' '}
        <a href='https://github.com/saikathalderr/plan-it-pocker-lb' target='_blank'>
          <b>
            GitHub <GitHub sx={{ fontSize: 13 }} />
          </b>
        </a>
      </Typography>
    </Box>
  );
}

export default Footer;
