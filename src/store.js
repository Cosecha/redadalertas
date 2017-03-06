import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

export default function configureStore(browserHistory, initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, routerMiddleware(browserHistory)];

  if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger();
    middlewares.push(logger);
  }

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    ));

  sagaMiddleware.run(rootSaga);
  return store;
}
