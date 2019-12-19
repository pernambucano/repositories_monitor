import actionTypes from './actionTypes';

export const showRepositoryData = (repositoryPath) => {
  return {
    type: actionTypes.SHOW_REPOSITORY_DATA,
    data: repositoryPath,
  };
};
export const hideRepositoryData = (repositoryPath) => {
  return {
    type: actionTypes.HIDE_REPOSITORY_DATA,
    data: repositoryPath,
  };
};

export const showOneRepositoryData = (repositoryToShow, allRepositories) => {
  return {
    type: actionTypes.SHOW_ONE_REPOSITORY_DATA,
    data: {
      repositoryToShow: repositoryToShow,
      allRepositories: allRepositories
    },
  };
};

