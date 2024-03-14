import axios from "axios";

export const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    const { response } = error;
    if (response && response.status === 422) {
        localStorage.removeItem('ACCESS_TOKEN');
    }
    return Promise.reject(error);
});

export default axiosClient;
