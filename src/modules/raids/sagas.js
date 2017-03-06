import { call, put, take } from 'redux-saga/effects';

import { FETCH_RAIDS, loadRaids } from './actions';
import { getRaids } from './services';

export function* watchLoadRaids() {
  while (true) {
    yield take(FETCH_RAIDS);
    yield call(loadRaidSaga);
  }
}

export function* loadRaidSaga() {
  try {
    const raids = yield call(getRaids);
    console.log('Fetch successful!');
    console.log(raids.data);
    yield put(loadRaids(raids.data));
  }
  catch (error) {
    console.log(error)
  }
}
