import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, {error: null, loading: true});
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, {token: action.idToken, userId: action.userId, error: null, loading: false});
        case actionTypes.AUTH_ERROR:
            return updateObject(state, {error: action.error, loading: false});
        case actionTypes.LOGOUT:
            return updateObject(state,{userId: null, token: null});
        case actionTypes.SET_AUTH_REDIRECT:
            return updateObject(state, {authRedirectPath: action.path})
        default:
            return state;
    }
}

export default reducer;
