import { firestoreCreateNewRoom } from '../firebase/room';
import { ICreateRoom, IRoom } from '../interfaces';
import BackButton from './backButton';
import HomeButton from './homeButton';
import { AccountCircle } from '@mui/icons-material';
import {
  Chip,
  Divider,
  InputAdornment,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CreateRoom() {
  const navigate = useNavigate();
  const [joining, setJoining] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const onCreate = async () => {
    if (!fullName) return setError('Please provide a name');
    const createRoomArgs: ICreateRoom = {
      fullName,
    };
    setError('');
    setJoining(true);
    const roomId = await firestoreCreateNewRoom(createRoomArgs);
    setJoining(false);
    navigate(`/room/${roomId}`);
  };

  return (
    <div style={{ width: '50%' }}>
      <Box
        sx={{
          width: '100%',
          mt: -5,
          pb: 3,
        }}
      >
        <Box sx={{ mb: 5 }} data-testid='actionsContainer'>
          <Stack spacing={1} direction='row'>
            <BackButton />
            <HomeButton />
          </Stack>
        </Box>

        <Typography variant='h5' gutterBottom data-testid='headingText'>
          <b>Create </b>
          <Typography variant='subtitle1'>
            A new poker room & join with your team
          </Typography>
        </Typography>
        <TextField
          fullWidth
          autoFocus
          label='Name'
          id='fullName'
          margin='normal'
          variant='outlined'
          autoComplete='off'
          data-testid='fullNameInput'
          placeholder='Enter your name.'
          error={!!error.length}
          helperText={!!error.length ? <span data-testid='errorText'>{error}</span> : ''}
          onChange={(event) => {
            setFullName(event.target.value.trim());
            setError('');
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AccountCircle color={!!error.length ? 'error' : 'inherit'} />
              </InputAdornment>
            ),
          }}
        />
        <div>
          <Button
            onClick={onCreate}
            variant='contained'
            disabled={!!error.length || joining}
            data-testid='createButton'
          >
            {joining ? 'Creating...' : 'Create'}
          </Button>
        </div>
      </Box>
      <Divider data-testid='divider'>
        <Chip label='Or' data-testid='orChip' />
      </Divider>
      <Box
        sx={{
          width: '100%',
          pt: 3,
        }}
        data-testid='joinButtonContainer'
      >
        <Button
          variant='text'
          fullWidth
          component={Link}
          to={'/join-room'}
          disabled={joining}
        >
          Join
        </Button>
      </Box>
    </div>
  );
}

export default CreateRoom;
