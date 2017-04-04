import axios from '../../helpers/axios';
import { baseUrl } from '../../helpers';

export const loginRequestToApi = (payload) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/session`, payload)
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
});
