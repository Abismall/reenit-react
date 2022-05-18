import axios from 'axios'
import { getCurrentToken } from '../utils/'
export const baseUrl = 'http://localhost:8000/'

const axiosInstance = axios.create({
    baseURL: baseUrl,
});
axiosInstance.defaults.headers.common['Authorization'] = 'bearer ' + getCurrentToken();
axiosInstance.interceptors.response.use(
    res => res.data,
    err => (
        console.log(err, "AXIOS ERROR")
    )
);

export { axiosInstance };