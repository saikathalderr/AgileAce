import SocketContext from '../context/socket';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { createRoomEvent } from '../events';
import { Socket } from 'socket.io-client';
import { IRoom } from '../interfaces';
import { v4 as uuidv4 } from 'uuid';
import { storeUserInLocalStorage } from '../helper';

function CreateRoom() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const io: Socket = useContext(SocketContext);
  const uuRoomID: string = uuidv4({});

  const onCreate = () => {
    const createRoomArgs: IRoom = {
      fullName,
      roomId: uuRoomID,
      userId: io.id,
    };
    io.emit(createRoomEvent, createRoomArgs);
    storeUserInLocalStorage(createRoomArgs);
    navigate(`/room/${uuRoomID}`);
  };

  return (
    <>
      <input
        type='text'
        name='fullName'
        id='fullName'
        placeholder='Full Name'
        onChange={(event) => setFullName(event.target.value.trim())}
      />
      <button onClick={onCreate}>Create</button>
    </>
  );
}

export default CreateRoom;
