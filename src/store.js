import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import { reducer as appReducer } from './containers/app';
import { reducer as DashboardReducer } from './containers/dashboard';

import rootSaga from './rootSaga';

const reducer = combineReducers(
  {
    routing: routerReducer,
    app: appReducer,
    dashboard: DashboardReducer,
  }
);

export default function configureStore(browserHistory, initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, routerMiddleware(browserHistory)];


  if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger();
    middlewares.push(logger);
  }


  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    ));

  sagaMiddleware.run(rootSaga);
  return store;
}
