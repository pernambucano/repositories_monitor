import axios from 'axios';

export const getRepository = (repositoryPath) => {
  const token = localStorage.getItem('api-token');
  return axios(`/commits?repository-name=${repositoryPath}`, {
    method: 'get',
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

