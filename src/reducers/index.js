import { combineReducers } from "redux";

import eventsReducer from "./event";
import errorsReducer from "./errors";

const rootReducer = combineReducers(
  {
    events: eventsReducer,
    errors: errorsReducer
  }
);

export default rootReducer;
