import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authError = (error) => {
    return {
        type: actionTypes.AUTH_ERROR,
        error: error
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        userId: authData.localId
    }
}

export const logout = () => {
    localStorage.clear();
    return {
        type: actionTypes.LOGOUT
    }
}

export const checkAuthTimeout = expTime => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout());
        }, expTime*1000);
    }
}

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else {
            const expDate = new Date(localStorage.getItem('expirationDate'));
            const userId = localStorage.getItem('userId');
            if(expDate>new Date()){
                dispatch(authSuccess({idToken: token, localId: userId}));
                dispatch(checkAuthTimeout((expDate.getTime()-new Date().getTime())/1000));
            } else {
                dispatch(logout());
            }
        }
    }
}

export const auth = (email, password, signUp) => {
    return dispatch => {
        dispatch(authStart());
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=xxxx';
        if(!signUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=xxxx';
        }
        axios.post(url,
            {
                email: email, password: password, returnSecureToken: true
            }
        ).then(
            response => {
                localStorage.setItem('token', response.data.idToken);
                const expDate = new Date(new Date().getTime()+ response.data.expiresIn*1000);
                localStorage.setItem('expirationDate', expDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            }
        ).catch(
            err=> {
                dispatch(authError(err.response.data.error));
            }
        )
    };
}
