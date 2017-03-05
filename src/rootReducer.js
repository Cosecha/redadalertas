import { combineReducers }  from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducer as appReducer } from './containers/app';
import { reducer as dashboardReducer } from './containers/dashboard';
import raidsReducer from './reducers/raids';

const rootReducer = combineReducers(
  {
    routing: routerReducer,
    app: appReducer,
    dashboard: dashboardReducer,
    raids: raidsReducer,
  }
);

export default rootReducer;
