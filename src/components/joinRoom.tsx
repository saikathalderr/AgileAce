import { useContext, useState } from 'react';
import { IRoom } from '../interfaces';
import { joinRoomEvent } from '../events';
import { Socket } from 'socket.io-client';
import SocketContext from '../context/socket';
import { useNavigate } from 'react-router-dom';
import {
  getUserFromLocalStorage,
  storeUserInLocalStorage,
} from '../helper';

function JoinRoom() {
  const [fullName, setFullName] = useState('');
  const [roomId, setRoomId] = useState('');
  const io: Socket = useContext(SocketContext);
  const navigate = useNavigate();

  const onJoin = () => {
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
    navigate(`/room/${roomId}`);
  };

  return (
    <>
      <input
        type='text'
        name='roomId'
        id='roomId'
        placeholder='Room ID'
        onChange={(event) => setRoomId(event.target.value.trim())}
      />
      <input
        type='text'
        name='fullName'
        id='fullName'
        placeholder='Full Name'
        onChange={(event) => setFullName(event.target.value.trim())}
      />
      <button onClick={onJoin}>Join</button>
    </>
  );
}

export default JoinRoom;
