/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from './modules';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './styles/main.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
  
// 개발모드일때만 보이게 합니다.
const isDev = process.env.NODE_ENV === 'development';
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancer = devtools || compose;
const store = createStore(rootReducer, composeEnhancer());

ReactDOM.render( 
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
