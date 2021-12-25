import 'bootswatch/dist/lumen/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'; // new
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';

axios.defaults.xsrfCookieName = 'csrftoken'; // new
axios.defaults.xsrfHeaderName = 'X-CSRFToken'; // new

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);