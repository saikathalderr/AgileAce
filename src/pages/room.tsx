import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getRoomDataEvent,
  leaveRoomEvent,
  toggleUserVisibilityEvent,
  userLeftEvent,
} from '../events';

import {
  IEstimate,
  IRoomData,
  IToggleUserVisibility,
  IUser,
} from '../interfaces';
import {
  exitAlert,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../helper';
import usePageVisibility from '../hooks/usePageVisibility';
import Header from '../components/header';
import UsersList from '../components/usersList';
import CardList from '../components/cardList';
import { Alert, Box, Container, Snackbar } from '@mui/material';
import { socket } from '../context/socket';
import { Socket } from 'socket.io-client';

const Room = () => {
  const io: Socket = socket;
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [users, setUsers] = useState<IUser[]>([]);
  const [leaving, setLeaving] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [userLeft, setUserLeft] = useState<boolean>(false);
  const [userLeftMessage, setUserLeftMessage] = useState<string>('');
  const [localUser, setLocalUser] = useState(
    getUserFromLocalStorage(String(roomId))
  );
  const pageVisibilityStatus = usePageVisibility();
  const [estimates, setEstimates] = useState<IEstimate[]>([]);

  const onLeave = () => {
    setLeaving(true);
    io.emit(leaveRoomEvent, {
      roomId,
      userId: localUser?.userId,
    });
    removeUserFromLocalStorage(String(roomId));
    setLocalUser(undefined);
  };

  useEffect(() => {
    return () => {
      setMounted(true);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (leaving || mounted) return;
      else if (!localUser) {
        navigate(`/join-room?roomId=${roomId}`);
      }
    };
  }, [io.id]);

  useEffect(() => {
    if (leaving && !localUser && mounted) navigate('/');
  }, [localUser]);

  useEffect(() => {
    window.addEventListener('beforeunload', exitAlert);
    return () => {
      window.removeEventListener("beforeunload", exitAlert);
    };
  }, []);

  useEffect(() => {
    io.on(getRoomDataEvent, (payload: IRoomData) => {
      console.log('getRoomDataEvent triggered');
      const { users, estimates } = payload;
      setUsers(users);
      setEstimates(estimates);
    });
    io.on(userLeftEvent, (payload: string) => {
      setUserLeft(true);
      setUserLeftMessage(payload);
    });
    return () => {
      io.off(getRoomDataEvent);
      io.off(userLeftEvent);
    };
  }, [io]);

  useEffect(() => {
    if (!localUser) return;
    const toggleUserVisibilityEventPayload: IToggleUserVisibility = {
      user: localUser,
      visibilityStatus: pageVisibilityStatus,
    };
    io.emit(
      toggleUserVisibilityEvent,
      toggleUserVisibilityEventPayload
    );
  }, [pageVisibilityStatus]);

  if (!io || !localUser)
    return <div data-testid='loading'>Loading....</div>;

  return (
    <>
      <Container
        sx={{ width: '1080px', pb: 10 }}
        data-testid='roomPageContainer'
      >
        <Box>
          <Header
            roomId={String(roomId)}
            onLeave={onLeave}
            data-testid={'roomHeader'}
          />

          <CardList
            data-testid={'roomCardList'}
            userId={localUser?.userId}
            roomId={String(roomId)}
            estimates={estimates}
          />

          <UsersList
            data-testid={'roomUsersList'}
            users={users}
            roomId={String(roomId)}
            estimates={estimates}
          />
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={userLeft}
          autoHideDuration={1000}
        >
          <Alert severity='info'>{userLeftMessage}</Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default Room;
