import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

ReactDOM.render(
  <React.StrictMode>
    <ReactNotification />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);