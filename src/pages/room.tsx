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
  toggleUserVisibilityEvent,
  userLeftEvent,
} from '../events';

import { IToggleUserVisibility, IUser } from '../interfaces';
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../helper';
import usePageVisibility from '../hooks/usePageVisibility';

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
        <h1>Room: </h1>
        <input type='text' defaultValue={roomId} disabled />
        <button type='submit' onClick={onLeave}>
          leave
        </button>
        <ul>
          {users.map((user: IUser) => {
            return <li key={user.userId}>{user.fullName} - {!user.visibility ? '🟢 online' : '🟡 away'}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default Room;
