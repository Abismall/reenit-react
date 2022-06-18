import axios from 'axios';
export const baseUrl = 'https://reenit.net:8000/';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});
axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => err.response.status
);

export { axiosInstance };
