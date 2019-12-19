import actionTypes from '../actions/actionTypes';

const visibilityFilterReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.HIDE_REPOSITORY_DATA:
      return [...state, action.data];
    case actionTypes.SHOW_REPOSITORY_DATA:
      return state.filter((f) => f !== action.data);
    case actionTypes.SHOW_ONE_REPOSITORY_DATA: 
      let stateCopy = [...state, ...action.data.allRepositories];
      return stateCopy.filter((f) => f !== action.data.repositoryToShow);
    default:
      return state;
  }
};

export default visibilityFilterReducer;
