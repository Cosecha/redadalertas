import axios from 'axios';

export const getRaids = ()=> {
  // When routes are authenticated, we might have to pull an access_token
  // from localStorage here to pass it in the header.
  return axios.get(`http://localhost:8000/api/raids`);
}
