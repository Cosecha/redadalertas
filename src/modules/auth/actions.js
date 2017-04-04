export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const loginRequest = (email, password) => {
  return {
    type: LOGIN_REQUEST,
    email,
    password,
  };
};

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    sessionToken: data.sessionToken,
  };
}

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    error
  };
}

export const LOGOUT = 'LOGOUT';
export const logout = () => {
  return {
    type: LOGOUT
  };
}
