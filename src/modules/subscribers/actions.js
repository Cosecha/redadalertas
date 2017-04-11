export const CREATE_SUBSCRIBER = 'CREATE_SUBSCRIBER';
export const CREATE_SUBSCRIBER_SUCCESS = 'CREATE_SUBSCRIBER_SUCCESS';
export const CREATE_SUBSCRIBER_FAILURE = 'CREATE_SUBSCRIBER_FAILURE';

export function createSubscriber(phoneNumber, zipCode) {
  return {
    type: CREATE_SUBSCRIBER,
    phoneNumber,
    zipCode
  }
};

export function createSubscriberSuccess(data) {
  return {
    type: CREATE_SUBSCRIBER_SUCCESS,
    payload: data
  };
}

export function createSubscriberFailure(error) {
  return {
    type: CREATE_SUBSCRIBER_FAILURE,
    payload: error
  };
}
