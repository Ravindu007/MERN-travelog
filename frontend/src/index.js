import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {TravelLogContextProvider} from "../src/context/travelLogContext"
import {AuthContextProvider} from "../src/context/authContext"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <TravelLogContextProvider>
      <App />
    </TravelLogContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
