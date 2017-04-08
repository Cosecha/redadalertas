import axios from 'axios';
import { getStoredAuthData } from './index';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

const authData = getStoredAuthData();
if (authData.sessionToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${authData.sessionToken}`;
}

export default axios;
