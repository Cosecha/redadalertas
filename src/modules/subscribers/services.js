import axios from 'axios';

export const postSubscriber = (data)=> {
  // When routes are authenticated, we might have to pull an access_token
  // from localStorage here to pass it in the header.
  return axios.post('http://localhost:8080/api/subscriber', {
    phoneNumber: data.phoneNumber,
    zipCode: data.zipCode
  });
}
