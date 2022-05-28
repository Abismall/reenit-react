import axios from 'axios';
export const baseUrl = 'http://127.0.0.1:8000/';
import winston from 'winston';
import winstonRotator from 'winston-daily-rotate-file';
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
    }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export const axiosInstance = axios.create({
  baseURL: baseUrl,
});
axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    logger.log({ level: 'error', message: err });
    console.log(err);
  }
);
export const getGameById = (id) => {
  return axiosInstance.get(`/reenit/scrims/${id}`);
};
export const getAvailableLocations = () => {
  return axiosInstance.get('dathost/available/');
};
export const removeUserFromLobby = (id) => {
  return axiosInstance.delete(`/reenit/${id}`);
};
