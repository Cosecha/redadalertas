export const SET_EVENTS_ERROR = "SET_EVENTS_ERROR";
export const SET_USER_ERROR = "SET_USER_ERROR";

const initialState = {
  event: null,
  user: null
};

export default function errorsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EVENTS_ERROR:
      return { ...state, event: action.payload.error };
    case SET_USER_ERROR:
      return { ...state, user: action.payload.error };
    default:
      return state;
  }
}

const getEventsError = error => {
  return {
    type: SET_EVENTS_ERROR,
    payload: { error }
  }
};

const setUserError = error => {
  return {
    type: SET_USER_ERROR,
    payload: { error }
  }
};
