import { createContext } from 'react';
import { Socket, io } from 'socket.io-client';

export const socket: Socket = io('http://localhost:8080', {
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionAttempts: Infinity,
  transports: ['websocket'],
});
const SocketContext = createContext(socket);
export const SocketProver = SocketContext.Provider;
export default SocketContext;
