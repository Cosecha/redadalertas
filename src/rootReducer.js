import { combineReducers }  from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducer as appReducer } from './containers/app';
import raidsReducer from './modules/raids/reducers';

const rootReducer = combineReducers(
  {
    routing: routerReducer,
    app: appReducer,
    raids: raidsReducer,
  }
);

export default rootReducer;
