import asyncStore from "utils/asyncstorage";
import userServices from "services/user";
import setUserError from "./error";

export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return action.payload;
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

const clearUser = user => ({
  type: CLEAR_USER
});


export function getUserToken() {
  return async dispatch => {
    let user;
    try {
      user = JSON.parse(await asyncStore.retrieve("user"));
      if (user instanceof Error) throw user;
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setUserError(error));
    }
  };
}

export function deleteUserToken() {
  return async dispatch => {
    try {
      dispatch(clearUser());
    } catch (error) {
      dispatch(setUserError(error));
    }
  };
}
