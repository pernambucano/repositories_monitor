// import pages
import 'bootstrap-includes';
import '../sass/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import { createStore, applyMiddleware, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import authReducer from './app/repositories-monitor/store/reducers/auth';
import thunk from 'redux-thunk';
import repositoryReducer from './app/repositories-monitor/store/reducers/repository';

const reducer = combineReducers({
	auth: authReducer,
	repository: repositoryReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

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
