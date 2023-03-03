import SocketContext from '../context/socket';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { createRoomEvent } from '../events';
import { Socket } from 'socket.io-client';
import { IRoom } from '../interfaces';
import { v4 as uuidv4 } from 'uuid';
import { storeUserInLocalStorage } from '../helper';
import {
  Chip,
  Divider,
  InputAdornment,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import Box from '@mui/material/Box';
import { AccountCircle } from '@mui/icons-material';
import Button from '@mui/material/Button';
import BackButton from './backButton';
import HomeButton from './homeButton';

function CreateRoom() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const io = useContext<Socket>(SocketContext);
  const uuRoomID: string = uuidv4({});

  const onCreate = () => {
    if (!fullName) return setError('Please provide a name');
    const createRoomArgs: IRoom = {
      fullName,
      roomId: uuRoomID,
      userId: io.id,
    };
    io.emit(createRoomEvent, createRoomArgs);
    storeUserInLocalStorage(createRoomArgs);
    setError('');
    navigate(`/room/${uuRoomID}`);
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
        <Box sx={{ mb: 5 }}>
          <Stack spacing={1} direction='row'>
            <BackButton />
            <HomeButton />
          </Stack>
        </Box>

        <Typography variant='h5' gutterBottom>
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
          placeholder='Enter your name.'
          error={!!error.length}
          helperText={!!error.length ? error : ''}
          onChange={(event) => {
            setFullName(event.target.value.trim());
            setError('');
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AccountCircle
                  color={!!error.length ? 'error' : 'inherit'}
                />
              </InputAdornment>
            ),
          }}
        />
        <div>
          <Button
            onClick={onCreate}
            variant='contained'
            disabled={!!error.length}
          >
            Create
          </Button>
        </div>
      </Box>
      <Divider>
        <Chip label='Or' />
      </Divider>
      <Box
        sx={{
          width: '100%',
          pt: 3,
        }}
      >
        <Button
          variant='text'
          fullWidth
          component={Link}
          to={'/join-room'}
        >
          Join
        </Button>
      </Box>
    </div>
  );
}

export default CreateRoom;
