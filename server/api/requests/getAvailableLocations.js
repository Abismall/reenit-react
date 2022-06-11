const axiosInstance = require('../axiosinstance.js');
module.exports = function () {
  return axiosInstance.get('dathost/available/');
};
