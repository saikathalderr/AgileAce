import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

export const socket: Socket = io('http://localhost:8080');
const SocketContext = createContext(socket);
export const SocketProver = SocketContext.Provider;
export default SocketContext;
