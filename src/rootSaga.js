import { fork } from 'redux-saga/effects';
import * as raidSagas from './modules/raids/sagas';
import { sagas as authSagas } from './modules/auth';

export default function* rootSaga() {
  yield [
    fork(raidSagas.watchLoadRaids),
    fork(authSagas.watchLoginRequest),
    fork(authSagas.watchLoginSuccess),
    fork(authSagas.watchLoginFailure),
    fork(authSagas.watchLogout),
  ];
}
