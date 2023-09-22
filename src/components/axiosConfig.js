import axios from 'axios';
import apiUrl from "./apiConfig";

const axiosConfig = axios.create({
    baseURL: apiUrl
});
axiosConfig.interceptors.request.use(
    config => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);
export default axiosConfig;
