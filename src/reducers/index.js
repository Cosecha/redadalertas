import { combineReducers } from "redux";

import eventsReducer from "./event";
import errorsReducer from "./error";
import userReducer from "./user";

const rootReducer = combineReducers(
  {
    events: eventsReducer,
    user: userReducer,
    errors: errorsReducer
  }
);

export default rootReducer;
