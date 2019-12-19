import React from 'react';
import { hot } from 'react-hot-loader';

import Routes from './routes/Routes';
import SentryBoundary from './utils/SentryBoundary'; 

const App = () => (
  <SentryBoundary>
    <Routes />
  </SentryBoundary>
);

export default hot(module)(App);
