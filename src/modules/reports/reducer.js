import { LOAD_REPORT, RECEIVE_REPORTS, UPDATE_REPORT } from './actions';

const initialState = [];

export const reducer = (state = initialState, action)=> {
  switch (action.type) {
    case LOAD_REPORT:
      return action.payload;
    case RECEIVE_REPORTS:
      return action.payload;
    case UPDATE_REPORT:
      state = state.map(raid => raid.id === action.payload.id ? action.payload : raid);
      return state;
    default:
      return state;
  }
}
