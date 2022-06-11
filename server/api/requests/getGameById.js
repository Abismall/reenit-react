const axiosInstance = require('../axiosinstance.js');
module.exports = function (id) {
  return axiosInstance.get(`/reenit/scrims/${id}`);
};
