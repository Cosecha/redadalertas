import { call, put, take } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { CREATE_SUBSCRIBER, CREATE_SUBSCRIBER_SUCCESS, CREATE_SUBSCRIBER_FAILURE,
  createSubscriberSuccess, createSubscriberFailure } from './actions';
import { postSubscriber } from './services';

export function* watchCreateSubscriber() {
  while (true) {
    const data = yield take(CREATE_SUBSCRIBER);
    yield call(createSubscriberSaga, data.phoneNumber, data.zipCode);
  }
}

export function* watchCreateSubscriberSuccess() {
  while (true) {
    const { data } = yield take(CREATE_SUBSCRIBER_SUCCESS);
    console.log('watchCreateSubscriberSuccess data: ', data);
    yield call(createSubscriberSuccessSaga);
  }
};

export function* watchCreateSubscriberFailure() {
  while (true) {
    const { data } = yield take(CREATE_SUBSCRIBER_FAILURE);
    console.log('watchCreateSubscriberFailure data: ', data);
  }
};

export function* createSubscriberSaga(phoneNumber, zipCode) {
  try {
    console.log('createSubscriberSaga: ');
    console.log('phoneNumber: ', phoneNumber);
    console.log('zipCode: ', zipCode);
    const payload = {
      phoneNumber,
      zipCode,
    };
    const { data } = yield call(postSubscriber, payload);
    console.log('postSubscriber successful!');
    console.log(data);
    yield put(createSubscriberSuccess(data));
  } catch (error) {
    console.log('createSubscriberSaga error: ' + error);
    yield put(createSubscriberFailure(error));
  }
}

export function* createSubscriberSuccessSaga() {
  try {
    yield put(push('/dashboard'));
  } catch (error) {
    console.log('createSubscriberSuccessSaga error: ' + error);
    yield put(push('/dashboard'));
  }
}
