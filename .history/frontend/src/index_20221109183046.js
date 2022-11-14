import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import database from './database';

ReactDOM.render(
  <Provider store={database}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
