import axios from 'axios';

export const getRepository = (repositoryPath) => {
  const token = localStorage.getItem('api-token');
  return axios(`/api/commits?repository-name=${repositoryPath}`, {
    method: 'get',
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};


export const filterData = (commitList, deselectedItems) => {
  const listWithKeys = commitList.map((d) => {
    return { ...d, key: d.sha };
  });

  if (deselectedItems.length > 0) {
    return listWithKeys.filter((f) => !deselectedItems.includes(f.repository));
  } else {
    return listWithKeys;
  }
};

export const showOnlyOneRepository = (commitList, repositoryName) => {
  return commitList.filter(f => f.repository == repositoryName);
}