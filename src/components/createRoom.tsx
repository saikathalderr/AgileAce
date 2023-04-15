import { firestoreCreateNewRoom } from '../firebase/room';
import { ICreateRoom } from '../interfaces';
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
import ToolBar from './ToolBar';
import { useFirebaseAuth } from '../firebase/context/auth.context';

function CreateRoom() {
  const { user } = useFirebaseAuth();
  const navigate = useNavigate();
  const [joining, setJoining] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const onCreate = async () => {
    const createRoomArgs: ICreateRoom = {
      fullName: user?.displayName || '',
      userId: user?.uid || '',
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
        <ToolBar/>
        <Typography variant='h5' gutterBottom data-testid='headingText'>
          <b>Create </b>
          <Typography variant='subtitle1'>
            A new poker room & join with your team
          </Typography>
        </Typography>
        <div>
          <Button
            onClick={onCreate}
            variant='contained'
            disabled={!!error.length || joining}
            data-testid='createButton'
          >
            {joining ? 'Creating...' : 'Create new'}
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
