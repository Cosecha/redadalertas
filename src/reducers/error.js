export const SET_EVENTS_ERROR = "SET_EVENTS_ERROR";

const initialState = {
  event: null
};

export default function errorsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EVENTS_ERROR:
      return { ...state, event: action.payload.error };
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
