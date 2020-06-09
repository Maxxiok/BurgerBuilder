import reducer from './auth';
import * as actionTypes from '../actions/actionsTypes';

describe('auth reducer', () => {
    it('should return init state', function () {
        expect(reducer(undefined, {})).not.toBeNull();
    });

    it('should store token on login', function () {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'test',
            userId: '1234test'
        })).toEqual({
            token: 'test',
            userId: '1234test',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });
})
