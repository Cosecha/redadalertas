import 'isomorphic-fetch';
import { call, put, take } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  setStoredAuthData,
  removeStoredAuthData
} from '../../helpers';

import { loginRequestToApi } from './services';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  loginFailure,
  loginSuccess
} from './actions';

export function* watchLoginRequest() {
  while (true) {
    const action = yield take(LOGIN_REQUEST);
    console.log('In watchLoginRequest');
    yield call(loginRequestSaga, action.email, action.password);
  }
};

export function* watchLoginSuccess() {
  while (true) {
    const { sessionToken } = yield take(LOGIN_SUCCESS);
    setStoredAuthData(sessionToken);
    yield call(loginSuccessSaga);
  }
};

export function* watchLoginFailure() {
  while (true) {
    yield take(LOGIN_FAILURE);
    removeStoredAuthData();
  }
};

export function* watchLogout() {
  while (true) {
    yield take(LOGOUT);
    console.log('LOGOUT');
    removeStoredAuthData();
    yield put(push('/'));
  }
};

export function* loginRequestSaga(email, password) {

  console.log(email);
  console.log(password);
  const payload = {
    email,
    password,
  };

  try {
    const { data } = yield call(loginRequestToApi, payload);
    console.log(data);
    yield put(loginSuccess(data));
  }
  catch (error) {
    yield put(loginFailure(error));
  }
};

export function* loginSuccessSaga() {

  const isSuperAdmin = () => new Promise((resolve, reject) => {
    if (true) {
      resolve(true);
    }
    else {
      resolve(false);
    }
  });
  try {
    const isSuper = yield call(isSuperAdmin);
    if(isSuper) {
      yield put(push('/dashboard'));
    }
    else {
      yield put(push('/dashboard'));
    }
  }
  catch (err) {
    console.log(err);
  }
}
