import actionTypes from '../actions/actionTypes';

const repositoryReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.UPDATE_REPOSITORY_DATA:
      return [...state, ...action.data];
    default:
      return state;
  }
};

export default repositoryReducer;
