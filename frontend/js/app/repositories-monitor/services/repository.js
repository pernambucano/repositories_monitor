import axios from 'axios';
const baseUrl = 'http://localhost:8000/api';

export const getRepository = (repositoryPath) => {
  const token = localStorage.getItem('api-token');
  return axios(`${baseUrl}/commits?repository-name=${repositoryPath}`, {
    method: 'get',
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

