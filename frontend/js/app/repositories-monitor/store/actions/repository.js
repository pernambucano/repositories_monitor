import actionTypes from './actionTypes';
import {  getRepository } from '../../services/repository';

export const initializeRepository = (repositoryPath) => {
	console.log('repositoryPath', repositoryPath);
  if (repositoryPath !== undefined) {
	console.log('repositoryPath', repositoryPath);
    return async (dispatch) => {
      const repository = await getRepository(repositoryPath);
		console.log('data', repository);
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
