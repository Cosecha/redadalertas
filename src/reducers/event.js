export const SET_EVENTS = "SET_EVENTS";
import eventServices from "services/event";

const initialState = [];

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EVENTS:
      return action.payload;
    default:
      return state;
  }
}

export function setEvents(events) {
  return {
    type: SET_EVENTS,
    payload: events
  }
}

export const getEvents = () => {
  return async (dispatch) => {
    try {
      const response = await eventServices.gets();
      dispatch(setEvents(response.data));
    } catch (error) {
      console.log("redux getEvents error: ", error);
    }
  }
}
