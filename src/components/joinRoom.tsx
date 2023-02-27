import { useContext, useState } from 'react';
import { IRoom } from '../interfaces';
import { joinRoomEvent } from '../events';
import { Socket } from 'socket.io-client';
import SocketContext from '../context/socket';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  getUserFromLocalStorage,
  storeUserInLocalStorage,
} from '../helper';
import Box from '@mui/material/Box';
import BackButton from './BackButton';
import {
  Chip,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { AccountCircle, Key } from '@mui/icons-material';
import Button from '@mui/material/Button';
import HomeButton from './HomeButton';

function JoinRoom() {
  const [searchParams] = useSearchParams();
  const roomIdParams = searchParams.get('roomId');

  const [fullName, setFullName] = useState<string>('');
  const [roomId, setRoomId] = useState<string>(roomIdParams || '');
  const [isRoomIdPreFilled, setIsRoomIdPreFilled] = useState<boolean>(
    !!roomIdParams || false
  );
  const [nameError, setNameError] = useState<string>('');
  const [roomIdError, setRoomIdError] = useState<string>('');
  const io: Socket = useContext(SocketContext);
  const navigate = useNavigate();

  const onJoin = () => {
    if (!fullName) return setNameError('Name is missing!');
    if (!roomId) return setRoomIdError('Room id is missing!');

    const joinRoomArgs: IRoom = {
      fullName,
      roomId: roomId,
      userId: io.id,
    };
    const hasUser = getUserFromLocalStorage(String(roomId));
    if (hasUser) {
      alert('you are already in the room');
      return navigate(`/room/${roomId}`);
    }
    io.emit(joinRoomEvent, joinRoomArgs);
    storeUserInLocalStorage(joinRoomArgs);
    setNameError('');
    setRoomIdError('');
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
        <Box sx={{ mb: 5 }}>
          <Stack spacing={1} direction='row'>
            <BackButton />
            <HomeButton />
          </Stack>
        </Box>

        <Typography variant='h5' gutterBottom>
          <b>Join </b>
          <Typography variant='subtitle1'>
            the poker room with your team
          </Typography>
        </Typography>

        <TextField
          fullWidth
          autoFocus
          label='Name'
          id='fullName'
          margin='normal'
          autoComplete='off'
          variant='outlined'
          placeholder='Enter your name.'
          error={!!nameError.length}
          helperText={!!nameError.length ? nameError : ''}
          onChange={(event) => {
            setFullName(event.target.value.trim());
            setNameError('');
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AccountCircle
                  color={!!nameError.length ? 'error' : 'inherit'}
                />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label='Room ID'
          id='roomId'
          margin='normal'
          variant='outlined'
          autoComplete='off'
          placeholder='Enter room id'
          disabled={isRoomIdPreFilled}
          defaultValue={roomId}
          error={!!roomIdError.length}
          helperText={!!roomIdError.length ? roomIdError : ''}
          onChange={(event) => {
            setRoomId(event.target.value.trim());
            setRoomIdError('');
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Key
                  color={!!roomIdError.length ? 'error' : 'inherit'}
                />
              </InputAdornment>
            ),
          }}
        />

        <div>
          <Button
            onClick={onJoin}
            variant='contained'
            disabled={!!roomIdError.length || !!nameError.length}
          >
            Join
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
          to={'/create-room'}
        >
          Create
        </Button>
      </Box>
    </div>
  );
}

export default JoinRoom;
