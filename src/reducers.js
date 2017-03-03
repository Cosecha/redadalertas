import { combineReducers }  from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducer as AppReducer } from './containers/app';
import { reducer as DashboardReducer } from './containers/dashboard';

const rootReducer = combineReducers(
  {
    routing: routerReducer,
    app: AppReducer,
    dashboard: DashboardReducer,
  }
);

export default rootReducer;
