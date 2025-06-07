import axios, {AxiosRequestConfig} from 'axios';
import {AuthResponse} from "../helpers/types";
import {URL_SERVER} from "../config/config.ts";


export const API_URL = `${URL_SERVER}/api`;

const instance = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

instance.interceptors.request.use((config) => {
    config!.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

instance.interceptors.response.use((response) => {
    return response;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            return instance.request(originalRequest);
        } catch (e) {
            localStorage.removeItem('token');
        }
    }
    if (error.response.status === 403 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            return instance.request(originalRequest);
        } catch (e) {

        }
    }
    throw error;
});

export default instance;