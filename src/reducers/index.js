import { combineReducers } from "redux";

import eventReducer from "./event";

const rootReducer = combineReducers(
  {
    events: eventReducer
  }
);

export default rootReducer;
