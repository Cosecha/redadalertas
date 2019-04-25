export const SET_EVENTS = "SET_EVENTS";
import eventServices from "services/event";
import setEventsError from "./error";

const initialState = [];

export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EVENTS:
      return action.payload;
    default:
      return state;
  }
}

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
      dispatch(setEventsError(error));
    }
  }
}
