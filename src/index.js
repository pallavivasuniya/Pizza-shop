// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store'; // Import the store
import App from './App'; // Import the App component
import './index.css';

// Initialize React root at the entry point (index.js)
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application within StrictMode and the Redux Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
