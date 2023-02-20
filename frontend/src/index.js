import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {TravelLogContextProvider} from "../src/context/travelLogContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TravelLogContextProvider>
      <App />
    </TravelLogContextProvider>
  </React.StrictMode>
);
