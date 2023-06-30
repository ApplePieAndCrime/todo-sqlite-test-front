import axios from 'axios';
import { apiUrl } from './baseVars';
import jwt_decode from 'jwt-decode';

const $axios = axios.create({});

$axios.interceptors.request.use(config => {
  let tokensData = JSON.parse(localStorage.getItem('tokens'));
  config.headers.common['Authorization'] = `bearer ${tokensData.accessToken}`;
  return config;
});

$axios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response.status === 401) {
      const authData = JSON.parse(localStorage.getItem('tokens'));

      const user = jwt_decode(authData.accessToken);
      const payload = {
        userId: user.sub,
        refreshToken: authData.refreshToken,
      };

      let apiResponse = await axios.post(
        apiUrl + '/auth/refresh-token',
        payload
      );
      localStorage.setItem('tokens', JSON.stringify(apiResponse.data));

      error.config.headers[
        'Authorization'
      ] = `bearer ${apiResponse.data.accessToken}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

export default $axios;
