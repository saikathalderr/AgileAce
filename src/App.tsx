import './App.css';
import { useContext, useEffect } from 'react';
import SocketContext from './context/socket';
import { Socket } from 'socket.io-client';

function App() {
  const socket: Socket = useContext(SocketContext);
  useEffect(() => {
    return () => {
      console.log(socket);
    };
  }, []);
  return <div>Hello</div>;
}

export default App;
