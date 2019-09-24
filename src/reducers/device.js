import asyncStore from "utils/asyncstorage";
import setDeviceError from "./error";

export const SET_DEVICE = "SET_DEVICE";
export const RESET_DEVICE = "RESET_DEVICE";

const initialState = {
  language: "en",
  location: {
    zip: 94110
  }
};

export default function deviceReducer(state = initialState, action) {
  switch (action.type) {
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

const resetDevice = () => ({
  type: RESET_DEVICE
});

export function saveDeviceSettings(settings) {
  return dispatch => {
    try {
      dispatch(setDevice(settings));
    } catch (error) {
      dispatch(setDeviceError(error));
    }
  };
}
