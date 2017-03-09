import { combineReducers }  from 'redux';
import { routerReducer } from 'react-router-redux';
import { i18nState } from 'redux-i18n';

import { reducer as appReducer } from './containers/app';
import raidsReducer from './modules/raids/reducers';

const rootReducer = combineReducers(
  {
    routing: routerReducer,
    app: appReducer,
    raids: raidsReducer,
    i18nState
  }
);

export default rootReducer;
