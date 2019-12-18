import actionTypes from './actionTypes';
import { getRepository } from '../../services/repository';

export const initializeRepository = (repositoryPath) => {
  if (repositoryPath !== undefined) {
    return async (dispatch) => {
      const repository = await getRepository(repositoryPath);
      dispatch({
        type: actionTypes.UPDATE_REPOSITORY_DATA,
        data: repository.data,
      });
    };
  }
};

export const removeRepository = (repositoryPath) => {
  return {
    type: actionTypes.REMOVE_REPOSITORY_DATA,
    data: repositoryPath,
  };
};

export const makeRepositoryVisible = (repositoryPath) => {
  return {
    type: actionTypes.MAKE_REPOSITORY_VISIBLE,
    data: repositoryPath,
  };
};

export const updateRepository = (updateData) => {
  if (updateData !== undefined) {


    const formattedUpdateData = updateData.commits.map(data => {
      return {
        sha: data.id,
        message: data.message,
        date: data.timestamp,
        repository: updateData.repository.full_name
      }
    })
    return async (dispatch) => {
      dispatch({
        type: actionTypes.UPDATE_REPOSITORY_DATA,
        data: formattedUpdateData,
      });
    };
  }
};
