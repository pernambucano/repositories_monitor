import * as actionTypes from '../actions/actionTypes';

const initialState = [];
const repositoryReducer = (state = [], action) => {
	console.log('action.data', action.data)
  switch (action.type) {
    case 'INIT_REPOSITORY_DATA':
      return state.concat(action.data);
    case 'REMOVE_REPOSITORY_DATA':
      //TODO filter not working
      const repo = action.data;
      return state.filter((c) => c.repository !== repo);
    default:
      return state;
  }
};

export default repositoryReducer;
