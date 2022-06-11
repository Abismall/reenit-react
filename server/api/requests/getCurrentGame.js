const axiosInstance = require('../axiosinstance.js');
module.exports = function (username) {
  return axiosInstance.get(`/users/user/current/${username}`);
};
