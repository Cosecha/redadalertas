import { combineReducers }  from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducer as appReducer } from './containers/app';
import { reducer as dashboardReducer } from './containers/dashboard';

const rootReducer = combineReducers(
  {
    routing: routerReducer,
    app: appReducer,
    dashboard: dashboardReducer
  }
);

export default rootReducer;
