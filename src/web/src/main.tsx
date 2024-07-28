import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';

// Ensure the 'root' element is not null
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('The root element was not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
