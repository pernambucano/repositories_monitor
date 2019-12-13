import actionTypes from './actionTypes';
import { getRepository } from '../../services/repository';

export const initializeRepository = (repositoryPath) => {
  if (repositoryPath !== undefined) {
    return async (dispatch) => {
      const repository = await getRepository(repositoryPath);
      dispatch({
        type: actionTypes.INIT_REPOSITORY_DATA,
        data: repository.data,
      });
    };
  }
};

export const removeRepository = (repositoryPath) => {
  return {
    type: 'REMOVE_REPOSITORY_DATA',
    data: repositoryPath,
  };
};

export const makeRepositoryVisible = (repositoryPath) => {
  return {
    type: 'MAKE_REPOSITORY_VISIBLE',
    data: repositoryPath,
  };
};
