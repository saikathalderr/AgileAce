import SocketContext from '../context/socket';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import {
  fetchRoomDataEvent,
  getRoomDataEvent,
  joinRoomEvent,
  leaveRoomEvent,
  toggleUserVisibilityEvent,
  userLeftEvent,
} from '../events';

import {
  IEstimate,
  IRoom,
  IRoomData,
  IToggleUserVisibility,
  IUser,
} from '../interfaces';
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  storeUserInLocalStorage,
} from '../helper';
import usePageVisibility from '../hooks/usePageVisibility';
import AppBar from '../components/appBar';
import UsersList from '../components/usersList';
import CardList from '../components/cardList';

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
        navigate(`/join-room?roomId=${roomId}`)
        // const promptAns: string = prompt('Enter you name') || '';
        // if (!promptAns || !roomId) return navigate('/');
        // const joinRoomArgs: IRoom = {
        //   fullName: promptAns,
        //   roomId: roomId,
        //   userId: io.id,
        // };
        // storeUserInLocalStorage(joinRoomArgs);
        // setLocalUser(joinRoomArgs);
        // io.emit(joinRoomEvent, joinRoomArgs);
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

  if (!io || !localUser) return <div>Loading....</div>;

  return (
    <>
      <div>
        <AppBar roomId={String(roomId)} onLeave={onLeave} />
        <UsersList
          users={users}
          roomId={String(roomId)}
          estimates={estimates}
        />
        <CardList
          userId={localUser?.userId}
          roomId={String(roomId)}
          estimates={estimates}
        />
      </div>
    </>
  );
};

export default Room;
