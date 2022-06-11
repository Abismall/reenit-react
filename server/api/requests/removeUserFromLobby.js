const axiosInstance = require('../axiosinstance.js');
module.exports = function (id) {
  return axiosInstance.delete(`/reenit/${id}`);
};
