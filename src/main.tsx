import App from './App';
import { AuthenticatedRoute } from './AuthenticatedRoute';
import Footer from './components/footer';
import { auth } from './firebase';
import { AuthProvider } from './firebase/context/auth.context';
import './index.css';
import AuthPage from './pages/authPage';
import CreateRoomPage from './pages/createRoomPage';
import JoinRoomPage from './pages/joinRoomPage';
import Room from './pages/room';
import React, { useEffect } from 'react';
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
    element: (
      <>
        <AuthenticatedRoute>
          <Room />
        </AuthenticatedRoute>
      </>
    ),
  },
  {
    path: 'create-room',
    element: (
      <>
        <AuthenticatedRoute>
          <CreateRoomPage />
        </AuthenticatedRoute>
      </>
    ),
  },
  {
    path: 'join-room',
    element: (
      <>
        <AuthenticatedRoute>
          <JoinRoomPage />
        </AuthenticatedRoute>
      </>
    ),
  },
  {
    path: 'login',
    element: <AuthPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
        <Footer/>
      </AuthProvider>
    </>
  </React.StrictMode>
);
