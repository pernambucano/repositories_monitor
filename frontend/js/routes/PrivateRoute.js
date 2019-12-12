import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import authService from '../app/repositories-monitor/services/auth'

const PrivateRoute = (props) => {
  return <Fragment>{ authService.isAuthenticated() ? props.children : <Redirect to="/login" />}</Fragment>;
};

export default PrivateRoute;
