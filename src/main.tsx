import App from './App';
import { AuthenticatedRoute } from './AuthenticatedRoute';
import Footer from './components/footer';
import { AuthProvider } from './firebase/context/auth.context';
import './index.css';
import AuthPage from './pages/authPage';
import CreateRoomPage from './pages/createRoomPage';
import Feedbacks from './pages/feedbacks';
import JoinRoomPage from './pages/joinRoomPage';
import Room from './pages/room';
import theme from './theme';
import { ThemeProvider } from '@mui/material';
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
  {
    path: 'feedbacks',
    element: <Feedbacks />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer />
          <Footer />
        </AuthProvider>
      </ThemeProvider>
    </>
  </React.StrictMode>
);
