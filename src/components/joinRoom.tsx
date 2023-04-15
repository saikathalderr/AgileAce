import { firestoreJoinRoom } from '../firebase/room';
import { getUserFromLocalStorage } from '../helper';
import { IRoom } from '../interfaces';
import { AccountCircle, Key } from '@mui/icons-material';
import {
  Chip,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import ToolBar from './ToolBar';
import { useFirebaseAuth } from '../firebase/context/auth.context';
import { toast } from 'react-toastify';

function JoinRoom() {
  const [searchParams] = useSearchParams();
  const roomIdParams = searchParams.get('roomId');
  const { user } = useFirebaseAuth();

  const [joining, setJoining] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>(roomIdParams || '');
  const [isRoomIdPreFilled, setIsRoomIdPreFilled] = useState<boolean>(
    !!roomIdParams || false
  );
  const [nameError, setNameError] = useState<string>('');
  const [roomIdError, setRoomIdError] = useState<string>('');
  const navigate = useNavigate();

  const onJoin = async () => {
    if (!roomId) return setRoomIdError('Room id is missing!');

    const joinRoomArgs: IRoom = {
      fullName: user?.displayName || '',
      roomId: roomId,
    };
    const hasUser = getUserFromLocalStorage(String(roomId));
    if (hasUser) {
      toast.warn('you are already in the room');
      return navigate(`/room/${roomId}`);
    }
    setJoining(true);
    await firestoreJoinRoom(joinRoomArgs);
    setNameError('');
    setRoomIdError('');
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
        <ToolBar/>

        <Typography variant='h5' gutterBottom data-testid='headingText'>
          <b>Join </b>
          <Typography variant='subtitle1'>the poker room with your team</Typography>
        </Typography>

        <TextField
          fullWidth
          label='Room ID'
          id='roomId'
          margin='normal'
          variant='outlined'
          autoComplete='off'
          defaultValue={roomId}
          data-testid='roomIdInput'
          placeholder='Enter room id'
          disabled={isRoomIdPreFilled}
          error={!!roomIdError.length}
          helperText={
            !!roomIdError.length ? (
              <span data-testid='roomIdErrorText'>{roomIdError}</span>
            ) : (
              ''
            )
          }
          onChange={(event) => {
            setRoomId(event.target.value.trim());
            setRoomIdError('');
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Key color={!!roomIdError.length ? 'error' : 'inherit'} />
              </InputAdornment>
            ),
          }}
        />

        <div>
          <Button
            onClick={onJoin}
            variant='contained'
            data-testid='joinButton'
            disabled={!!roomIdError.length || !!nameError.length || joining}
          >
            {joining ? 'Joining...' : 'Join'}
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
        data-testid='createButtonContainer'
      >
        <Button
          variant='text'
          fullWidth
          component={Link}
          to={'/create-room'}
          disabled={joining}
        >
          Create
        </Button>
      </Box>
    </div>
  );
}

export default JoinRoom;
