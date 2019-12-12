import * as actionTypes from '../actions/actionTypes';

const updateObject = (oldState, newState) => {
	return {...oldState, ...newState};
}

const initalState = {
	token: null, 
	error: null,
	loading: false
}

const authStart = (state, action) => {
	return state;
}

const authSuccess = (state, action) => {
	return state;
}
const authFail = (state, action) => {
	return updateObject(...state, {
		error: action.error,
		loading: false
	})
}

const authCallbackStart = (state, action) => {
	return updateObject(...state, {
		error: null,
		loading: true
	})
}

const authCallbackSuccess = (state, action) => {
	return updateObject(...state, {
		error: null,
		loading: false,
		token: action.token
	})
}

const authCallbackFail = (state, action) => {
	return updateObject(...state, {
		error: action.error,
		loading: false
	});
}

const authLogout = (state, action) => {
	return updateObject(...state, {
		token: null
	});
}


const authReducer = (state=initalState, action) => {
	switch (action.type){
		case actionTypes.AUTH_START:
			return authStart(state, action);
		case actionTypes.AUTH_FAIL:
			return authFail(state, action);
		case actionTypes.AUTH_CALLBACK_START:
			return authCallbackStart(state, action);
		case actionTypes.AUTH_CALLBACK_FAIL:
			return authCallbackFail(state, action);
		case actionTypes.AUTH_CALLBACK_SUCCESS:
			return authCallbackSuccess(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action);
		default:
			return state;
	}
}

export default authReducer;
