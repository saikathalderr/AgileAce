import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function App() {
  return (
    <Stack spacing={2} direction='row'>
      <Link to='create-room'>
        <Button variant='contained' color='primary'>
          Create
        </Button>
      </Link>
      <Link to='join-room'>
        <Button variant='contained' color='success'>
          Join
        </Button>
      </Link>
    </Stack>
  );
}

export default App;
