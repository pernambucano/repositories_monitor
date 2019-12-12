import actionTypes from './actionTypes';
import authService from '../../services/auth';
import history from '../../history';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = () => {
  return {
    type: actionTypes.AUTH_SUCCESS,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authCallbackStart = (code, provider) => {
  return {
    type: actionTypes.AUTH_CALLBACK_START,
    provider: provider,
    code: code,
  };
};
export const authCallbackSuccess = (token) => {
  return {
    type: actionTypes.AUTH_CALLBACK_SUCCESS,
    token: token,
  };
};
export const authCallbackFail = (error) => {
  return {
    type: actionTypes.AUTH_CALLBACK_FAIL,
    error: error,
  };
};

export const authLogin = () => {
  return (dispatch) => {
    dispatch(authStart());
    authService.authLogin();
  };
};

export const authLogout = () => {
  localStorage.removeItem('token');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authCallback = (location) => {
  return async (dispatch) => {
    const code = (location.search.match(/code=([^&]+)/) || [])[1];
    //get code and provider from location and add to state
    // dispatch(authCallbackStart(code, 'github'));
    const response = await authService.authCallback(location); // use info from state

    if (response && response.data && response.data.token) {
      let token = response.data.token;
      authService.setToken(token);
      dispatch(authCallbackSuccess(token));
      history.push('/');
    } else {
      dispatch(authCallbackFail('Could not find the token'));
      history.push('/');
    }
  };
};
