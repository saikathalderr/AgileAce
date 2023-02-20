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

import { IRoom, IToggleUserVisibility, IUser } from '../interfaces';
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
  const [users, setUsers] = useState([]);
  const [leaving, setLeaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [localUser, setLocalUser] = useState(
    getUserFromLocalStorage(String(roomId))
  );
  const pageVisibilityStatus = usePageVisibility();

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
        const promptAns: string = prompt('Enter you name') || '';
        if (!promptAns || !roomId) return navigate('/');
        const joinRoomArgs: IRoom = {
          fullName: promptAns,
          roomId: roomId,
          userId: io.id,
        };
        storeUserInLocalStorage(joinRoomArgs);
        setLocalUser(joinRoomArgs);
        io.emit(joinRoomEvent, joinRoomArgs);
      }
    };
  }, [io.id]);

  useEffect(() => {
    if (leaving && !localUser && mounted) navigate('/');
  }, [localUser]);

  useEffect(() => {
    io.emit(fetchRoomDataEvent, roomId);
  }, [roomId, users]);

  useEffect(() => {
    io.on(getRoomDataEvent, (payload) => {
      setUsers(payload.users);
    });
  }, [io]);

  useEffect(() => {
    return () => {
      io.on(userLeftEvent, (payload) => {
        console.log(payload);
      });
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

  return (
    <>
      <div>
        <AppBar roomId={String(roomId)} onLeave={onLeave} />
        <UsersList users={users} />
        <CardList />
      </div>
    </>
  );
};

export default Room;
