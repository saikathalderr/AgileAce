import { createContext } from 'react';
import { Socket, io } from 'socket.io-client';

const EC2_URL: string = String(import.meta.env.VITE_BACK_END_URL)
let BACK_END_URL: string

if (import.meta.env.DEV) {
  BACK_END_URL = `ws://${EC2_URL}`
} else {
  BACK_END_URL = `wss://${EC2_URL}`
}

export const socket: Socket = io(BACK_END_URL, {
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionAttempts: Infinity,
  transports: ['websocket'],
});
const SocketContext = createContext(socket);
export const SocketProver = SocketContext.Provider;
export default SocketContext;
