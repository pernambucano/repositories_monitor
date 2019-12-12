// import pages
import 'bootstrap-includes';
import '../sass/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import authReducer from './store/reducers/auth';
import thunk from 'redux-thunk';

const store = createStore(authReducer, applyMiddleware(thunk));

Sentry.init({
  dsn: window.SENTRY_DSN,
  release: window.COMMIT_SHA,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-app')
);
