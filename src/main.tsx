import ReactDOM from 'react-dom/client';
import Room from './pages/room';
import React from 'react';
import App from './App';

import './index.css';
import { SocketProver, socket } from './context/socket';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import CreateRoomPage from './pages/createRoomPage';
import JoinRoomPage from './pages/joinRoomPage';
import Footer from './components/footer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'room/:roomId',
    element: <Room />,
  },
  {
    path: 'create-room',
    element: <CreateRoomPage />,
  },
  {
    path: 'join-room',
    element: <JoinRoomPage />,
  },
]);

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <SocketProver value={socket}>
      <RouterProvider router={router} />
      <Footer />
    </SocketProver>
  </React.StrictMode>
);
