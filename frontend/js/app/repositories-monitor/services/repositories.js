import axios from 'axios';

const getRepository = () => {
  const token = localStorage.getItem('api-token');
  return axios('http://localhost:8000/api/test', {
    method: 'get',
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export default getRepository;
