import React from 'react';
import { Router as Router, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import LoginCallback from '../pages/LoginCallback';

import PrivateRoute from './PrivateRoute';
import history from '../history'


const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/oauth-callback" component={LoginCallback} />
        <PrivateRoute>
          <Route exact path="/" component={Home} />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
