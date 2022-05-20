import axios from 'axios'
export const baseUrl = 'http://127.0.0.1:8000/'

const axiosInstance = axios.create({
    baseURL: baseUrl,
});
axiosInstance.interceptors.response.use(
    res => res.data,
    // err => (
    //     console.log(err, "AXIOS ERROR")
    // )
);

export { axiosInstance };