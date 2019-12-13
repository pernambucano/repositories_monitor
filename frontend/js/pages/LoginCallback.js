import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { authCallback } from '../app/repositories-monitor/store/actions/auth';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

const LoginCallback = (props) => {
  useEffect(() => {
    props.authCallback(props.location); 
  }, []);
  return <h1>Loading...</h1>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    authCallback: (loc) => dispatch(authCallback(loc)),
  };
};

export default connect(null, mapDispatchToProps)(LoginCallback);
