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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'room/:roomId',
    element: <Room />,
  },
]);

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <SocketProver value={socket}>
      <RouterProvider router={router} />
    </SocketProver>
  </React.StrictMode>
);
