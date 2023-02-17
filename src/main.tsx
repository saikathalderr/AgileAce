import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import './index.css';
import { SocketProver, socket } from './context/socket';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SocketProver value={socket}>
      <App />
    </SocketProver>
  </React.StrictMode>
);
