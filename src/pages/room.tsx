import SocketContext from '../context/socket';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import {
  fetchRoomDataEvent,
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
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../helper';
import usePageVisibility from '../hooks/usePageVisibility';
import Header from '../components/header';
import UsersList from '../components/usersList';
import CardList from '../components/cardList';
import { Box, Container } from '@mui/material';

const Room = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const io: Socket = useContext(SocketContext);
  const [users, setUsers] = useState<IUser[]>([]);
  const [leaving, setLeaving] = useState<Boolean>(false);
  const [mounted, setMounted] = useState<Boolean>(false);
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
      else if (io.id && !localUser) {
        navigate(`/join-room?roomId=${roomId}`);
      }
    };
  }, [io.id]);

  useEffect(() => {
    if (leaving && !localUser && mounted) navigate('/');
  }, [localUser]);

  useEffect(() => {
    io.emit(fetchRoomDataEvent, { roomId });
    return () => {
      io.off(fetchRoomDataEvent);
    };
  }, [roomId, users]);

  useEffect(() => {
    io.on(getRoomDataEvent, (payload: IRoomData) => {
      const { users, estimates } = payload;
      setUsers(users);
      setEstimates(estimates);
    });

    return () => {
      io.off(getRoomDataEvent);
    };
  }, [io, users, estimates]);

  useEffect(() => {
    io.on(userLeftEvent, (payload) => {
      console.log(payload);
    });

    return () => {
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
      </Container>
    </>
  );
};

export default Room;
