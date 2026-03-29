import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import { registerServiceWorker } from './pwa/registerServiceWorker';

// Renderiza o aplicativo principal no elemento root.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Registra o Service Worker para habilitar recursos offline e instalabilidade PWA.
registerServiceWorker();
