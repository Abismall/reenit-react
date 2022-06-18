axios = require('axios');
const baseUrl = 'https://reenit.net:8000/';

module.exports = axiosInstance = axios.create({
  baseURL: baseUrl,
});
axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.log(err);
  }
);
