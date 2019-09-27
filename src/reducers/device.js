import setDeviceError from "./error";

export const SET_DEVICE = "SET_DEVICE";
export const RESET_DEVICE = "RESET_DEVICE";
export const SET_DEVICE_LANGUAGE = "SET_DEVICE_LANGUAGE";

const initialState = {
  language: null,
  location: {
    zip: 94110 // TO-DO: use this to center map in EventsMap
  }
};

export default function deviceReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DEVICE_LANGUAGE:
      return { ...state, language: action.payload };
    case SET_DEVICE:
      return { ...action.payload };
    case RESET_DEVICE:
      return { ...initialState };
    default:
      return state;
  }
}

const setDevice = settings => ({
  type: SET_DEVICE,
  payload: settings
});

const setDeviceLanguage = language => ({
  type: SET_DEVICE_LANGUAGE,
  payload: language
});

const resetDevice = () => ({
  type: RESET_DEVICE
});

export function saveDeviceLanguage(language) {
  return dispatch => {
    try {
      dispatch(setDeviceLanguage(language));
    } catch (error) {
      dispatch(setDeviceError(error));
    }
  };
}

export function saveDevice(settings) {
  return dispatch => {
    try {
      dispatch(setDevice(settings));
    } catch (error) {
      dispatch(setDeviceError(error));
    }
  };
}

export function resetDeviceSettings() {
  return dispatch => {
    try {
      dispatch(resetDevice());
    } catch (error) {
      dispatch(setDeviceError(error));
    }
  };
}
