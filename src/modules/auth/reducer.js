import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './actions';

import { getStoredAuthData } from '../../helpers';

export const initialState = {
  isLoggingIn: false,
  sessionToken: null,
  error: null
};

const initializeState = () => {
  const storedAuthData = getStoredAuthData();
  return Object.assign({}, initialState, storedAuthData);
};

export const reducer = (state = initializeState(), action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        sessionToken: action.sessionToken,
        error: null,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        sessionToken: null,
        error: action.error,
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
