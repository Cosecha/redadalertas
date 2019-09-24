import { combineReducers } from "redux";
import { localizeReducer } from "react-localize-redux";

import eventsReducer from "./event";
import errorsReducer from "./error";
import userReducer from "./user";
import deviceReducer from "./device";

const rootReducer = combineReducers(
  {
    localize: localizeReducer,
    device: deviceReducer,
    events: eventsReducer,
    user: userReducer,
    errors: errorsReducer
  }
);

export default rootReducer;
