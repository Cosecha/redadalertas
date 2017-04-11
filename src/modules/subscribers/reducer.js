import {
  CREATE_SUBSCRIBER,
  CREATE_SUBSCRIBER_SUCCESS,
  CREATE_SUBSCRIBER_FAILURE } from './actions';

export const initialState = {
  isCreatingSubscriber: false,
  error: null
};

export const reducer = (state = initialState, action)=> {
  switch (action.type) {
    case CREATE_SUBSCRIBER:
      return {
        ...state,
        isCreatingSubscriber: true
      };
    case CREATE_SUBSCRIBER_SUCCESS:
      return {
        ...state,
        isCreatingSubscriber: false,
        error: null
      };
    case CREATE_SUBSCRIBER_FAILURE:
      return {
        ...state,
        isCreatingSubscriber: false,
        error: action.error
      };
    default:
      return state;
  }
}
