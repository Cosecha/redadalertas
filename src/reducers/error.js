export const SET_EVENTS_ERROR = "SET_EVENTS_ERROR";
export const SET_USER_ERROR = "SET_USER_ERROR";
export const SET_DEVICE_ERROR = "SET_DEVICE_ERROR";

const initialState = {
  device: null,
  event: null,
  user: null
};

export default function errorsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DEVICE_ERROR:
      return { ...state, device: action.payload.error };
    case SET_EVENTS_ERROR:
      return { ...state, event: action.payload.error };
    case SET_USER_ERROR:
      return { ...state, user: action.payload.error };
    default:
      return state;
  }
}

const setEventsError = error => ({
  type: SET_EVENTS_ERROR,
  payload: { error }
});

const setUserError = error => ({
  type: SET_USER_ERROR,
  payload: { error }
});

const setDeviceError = error => ({
  type: SET_DEVICE_ERROR,
  payload: { error }
});
