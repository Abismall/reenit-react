import axios from 'axios';
import { resetUser } from '../utils';
export const baseUrl = 'http://127.0.0.1:8000/';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});
axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response.status === 403) {
      resetUser();
    }
  }
);

export { axiosInstance };
