import axios from 'axios';
const baseUrl = `${window.location.protocol}//${window.location.host}`;
const clientId = '40192304617cf91a314d';
import Cookie from 'js-cookie';

const TOKEN_KEY = 'api-token';

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

const authCallback = (location) => {
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
