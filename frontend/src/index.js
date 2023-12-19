import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { Store } from '../src/Store/Store';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientID="587011555651-v0ftah0g405q73ctbmifkj76h9eafk7i.apps.googleusercontent.com">
      <Provider store={Store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

