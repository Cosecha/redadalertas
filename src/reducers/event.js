export const SET_EVENTS = "SET_EVENTS";
export const GET_EVENTS_ERROR = "GET_EVENTS_ERROR";
import eventServices from "services/event";

const initialState = {
  events: [],
  error: null
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EVENTS:
      return { ...state, error: null, events: action.payload };
    case GET_EVENTS_ERROR:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
}

const getEventsError = error => {
  return {
    type: GET_EVENTS_ERROR,
    payload: { error }
  }
};

const setEvents = events => {
  return {
    type: SET_EVENTS,
    payload: events
  }
};

export function getEvents() {
  return async dispatch => {
    try {
      const response = await eventServices.gets();
      if (response instanceof Error) throw response;
      dispatch(setEvents(response.data));
    } catch (error) {
      dispatch(getEventsError(error));
    }
  }
}
