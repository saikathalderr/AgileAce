import SocketContext from '../context/socket';
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import {
  fetchRoomDataEvent,
  getRoomDataEvent,
  leaveRoomEvent,
  userLeftEvent,
} from '../events';

import { IUser } from '../interfaces';
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../helper';

const Room = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const io: Socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);
  const [localUser, setLocalUser] = useState(
    getUserFromLocalStorage(String(roomId))
  );

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

  return (
    <>
      <div>
        <h1>Room: </h1>
        <input type='text' defaultValue={roomId} disabled />
        <button type='submit' onClick={onLeave}>
          leave
        </button>
        <ul>
          {users.map((user: IUser) => {
            return <li key={user.userId}>{user.fullName}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default Room;
