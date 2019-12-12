import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import authService from '../app/repositories-monitor/services/auth';

const Login = () => {
  const handleLoginWithGithub = useCallback(async function() {
    authService.authLogin();
  }, []);

  return (
    <div>
      <button onClick={handleLoginWithGithub}>Login with github</button>
    </div>
  );
};

export default Login;
