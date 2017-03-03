import { combineReducers }  from 'redux';
import { routerReducer } from 'react-router-redux';

import app from './containers/app/reducer';
import dashboard from './containers/dashboard/reducer';

const rootReducer = combineReducers(
  {
    routing: routerReducer,
    app: app,
    dashboard: dashboard
  }
);

export default rootReducer;
