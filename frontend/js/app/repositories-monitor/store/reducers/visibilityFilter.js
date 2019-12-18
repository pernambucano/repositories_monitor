import actionTypes from '../actions/actionTypes';

const visibilityFilterReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.HIDE_REPOSITORY_DATA:
      return [...state, action.data];
    case actionTypes.SHOW_REPOSITORY_DATA:
      return state.filter((f) => f !== action.data);
    default:
      return state;
  }
};

export default visibilityFilterReducer;
