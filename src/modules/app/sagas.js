import { call, put, take } from 'redux-saga/effects';

import { toggleDrawerActive } from './actions';

export function* watchShowSnackbar() {
  while (true) {
    yield take(SHOW_SNACKBAR);
    yield call(loadSnackbarMessage);
  }
}

export function* loadSnackbarMessage() {
  try {
    const serviceCall = yield call();
    yield put();
  } catch (error) {
    console.log(error);
  }
}
