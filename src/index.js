import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './API/user';
import { LoaderProvider } from './API/load';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <LoaderProvider>
      <App />
      </LoaderProvider>
    </UserProvider>
  </React.StrictMode>
);
