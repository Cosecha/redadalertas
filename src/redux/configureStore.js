// Vendor
import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";
import thunkMiddleware from "redux-thunk";

// Redadalertas
import rootReducer from "reducers/index";

const persistConfig = { key: "root", storage: AsyncStorage };
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  applyMiddleware(thunkMiddleware)
);
const persistor = persistStore(store);

export { persistor, store };
