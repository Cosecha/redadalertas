import userServices from "services/user";
import setUserError from "./error";

export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...action.payload };
    case CLEAR_USER:
      return { ...initialState };
    default:
      return state;
  }
}

const setUser = user => ({
  type: SET_USER,
  payload: user
});

const clearUser = () => ({
  type: CLEAR_USER
});


export function saveUserToken(user) {
  return dispatch => {
    let userToken = user;
    try {
      if (userToken instanceof Error) throw userToken;
      dispatch(setUser(userToken));
    } catch (error) {
      dispatch(setUserError(error));
    }
  };
}

export function deleteUserToken() {
  return dispatch => {
    try {
      dispatch(clearUser());
    } catch (error) {
      dispatch(setUserError(error));
    }
  };
}
