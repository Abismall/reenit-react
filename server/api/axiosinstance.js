axios = require('axios');
const baseUrl = 'http://127.0.0.1:8000/';

module.exports = axiosInstance = axios.create({
  baseURL: baseUrl,
});
axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.log(err);
  }
);