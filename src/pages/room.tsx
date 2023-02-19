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

import { IToggleUserVisibility, IUser } from '../interfaces';
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../helper';
import usePageVisibility from '../hooks/usePageVisibility';
import Card from '../components/card';
import Button from '../components/button';
import AppBar from '../components/appBar';
import UsersList from '../components/usersList';

const Room = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const io: Socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);
  const [localUser, setLocalUser] = useState(
    getUserFromLocalStorage(String(roomId))
  );
  const pageVisibilityStatus = usePageVisibility();

  const onLeave = () => {
    const { userId } = localUser;
    io.emit(leaveRoomEvent, {
      roomId,
      userId,
    });
    removeUserFromLocalStorage(String(roomId));
    navigate('/');
  };

  useEffect(() => {
    if (!roomId || !localUser) navigate('/');
  }, []);

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
        <div>
          <Card label='1' />
        </div>
      </div>
    </>
  );
};

export default Room;
