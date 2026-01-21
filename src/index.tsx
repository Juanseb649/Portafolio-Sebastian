import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/index';
import './styles/globals.css';

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw new Error('No se encontró el elemento #root');
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
);

