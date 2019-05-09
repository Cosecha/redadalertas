// Vendor
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

// Redadalertas
import rootReducer from "reducers/index";

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

export { store };
