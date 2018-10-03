import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import {
  setRoute,
  setUser,
  setUrl,
  requestFaceDetect,
} from './reducers';

import App from './containers/App';

import './index.css';
import 'tachyons';

const logger = createLogger();
const rootReducer = combineReducers(
  { setRoute, setUser, setUrl, requestFaceDetect }
);
const store = createStore(rootReducer, applyMiddleware(logger, thunk));
export default store;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
