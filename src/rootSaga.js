import { fork } from 'redux-saga/effects';
import * as raidSagas from './modules/raids/sagas';

export default function* rootSaga() {
  yield [
    fork(raidSagas.watchLoadRaids),
    // fork(authSagas.watchLoginSuccess),
    // fork(authSagas.watchLoginFailure),
    // fork(authSagas.watchLogout),
  ];
}
