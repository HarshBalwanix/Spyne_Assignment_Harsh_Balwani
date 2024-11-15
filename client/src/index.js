import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from "react-hot-toast"
import { UserProvider } from './ContextAPI/UserContext';
import { CarProvider } from './ContextAPI/CarContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <UserProvider>
      <CarProvider>
        <App />
        <Toaster />
      </CarProvider>
    </UserProvider>
  </>
);

