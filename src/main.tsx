import App from './App';
import Footer from './components/footer';
import './index.css';
import CreateRoomPage from './pages/createRoomPage';
import JoinRoomPage from './pages/joinRoomPage';
import Room from './pages/room';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <>
      <RouterProvider router={router} />
      <Footer />
      <ToastContainer />
    </>
  </React.StrictMode>
);
