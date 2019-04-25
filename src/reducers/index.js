import { combineReducers } from "redux";

import eventsReducer from "./event";
import errorsReducer from "./error";

const rootReducer = combineReducers(
  {
    events: eventsReducer,
    errors: errorsReducer
  }
);

export default rootReducer;
