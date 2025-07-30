import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import store from './store';
import './index.css';
import './styles/utilities.css'; // small utility classes (spacing, visually-hidden, etc.)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provide Redux store to the whole app */}
    <Provider store={store}>
      {/* BrowserRouter enables routing */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
