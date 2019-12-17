import axios from 'axios';
const baseUrl = 'http://localhost:8000';
const clientId = '40192304617cf91a314d';
import Cookie from 'js-cookie';
import { Redirect } from 'react-router-dom';

const TOKEN_KEY = 'api-token';

let token = null;

const setToken = (newToken) => {
  localStorage.setItem(TOKEN_KEY, newToken);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const isAuthenticated = () => {
  const token = getToken();
  return token !== null;
};

// TODO intercept axios calls to add header
const authCallback = (location) => {
  console.log(location);
  const code = (location.search.match(/code=([^&]+)/) || [])[1];
  const state = (location.search.match(/state=([^&]+)/) || [])[1];
  const csrftoken = Cookie.get('csrftoken');

  return axios(`/api/login/social/token/`, {
    method: 'POST',
    withCredentials: true,
    headers: {
      'X-CSRFTOKEN': csrftoken,
    },
    data: {
      provider: 'github',
      code: code,
      redirect_uri: baseUrl + '/oauth-callback',
    },
  });
};

const authLogin = () => {
  const qParams = [
    `client_id=${clientId}`,
    `redirect_uri=${baseUrl}/oauth-callback`,
    `scope=repo`,
    `state=github`,
  ].join('&');
  const url = `https://github.com/login/oauth/authorize?${qParams}`;
  window.location.assign(url);
};

export default {
  setToken,
  isAuthenticated,
  authCallback,
  authLogin,
};
