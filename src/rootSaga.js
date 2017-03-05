import { fork } from 'redux-saga/effects';
import { sagas as dashboardSagas } from './containers/dashboard';

export default function* rootSaga() {
  yield [
    fork(dashboardSagas.watchLoadRaids),
    // fork(authSagas.watchLoginSuccess),
    // fork(authSagas.watchLoginFailure),
    // fork(authSagas.watchLogout),
  ];
}
