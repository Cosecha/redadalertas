import { LOAD_RAIDS, RECEIVE_RAIDS, UPDATE_RAID } from './actions';

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_RAIDS:
      return action.payload;
    case RECEIVE_RAIDS:
      return action.payload;
    case UPDATE_RAID:
      state = state.map(raid => raid.id === action.payload.id ? action.payload : raid);
      return state;
    default:
      return state;
  }
}
