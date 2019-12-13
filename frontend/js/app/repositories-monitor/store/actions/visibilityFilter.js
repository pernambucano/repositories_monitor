export const showRepositoryData = (repositoryPath) => {
  return {
    type: 'SHOW_REPOSITORY_DATA',
    data: repositoryPath,
  };
};
export const hideRepositoryData = (repositoryPath) => {
  return {
    type: 'HIDE_REPOSITORY_DATA',
    data: repositoryPath,
  };
};

