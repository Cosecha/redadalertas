import { fork } from 'redux-saga/effects';
import * as raidSagas from './modules/raids/sagas';
import { sagas as authSagas } from './modules/auth';
import * as subscriberSagas from './modules/subscribers/sagas';

export default function* rootSaga() {
  yield [
    fork(raidSagas.watchLoadRaids),
    fork(authSagas.watchLoginRequest),
    fork(authSagas.watchLoginSuccess),
    fork(authSagas.watchLoginFailure),
    fork(authSagas.watchLogout),
    fork(subscriberSagas.watchCreateSubscriber),
  ];
}
