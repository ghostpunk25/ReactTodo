import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from 'components/App/App';
import { Provider } from 'context/Provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
