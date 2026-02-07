import axios from 'axios';

export const AuthAPI = axios.create({
    baseURL: 'http://localhost:5001',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

AuthAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem('Token');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

export const registerUser = (data) =>
    AuthAPI.post('/auth/create-account', data);
export const loginUser = (data) => AuthAPI.post('/auth/login', data);
export const forgotPassword = (data) =>
    AuthAPI.post('/auth/forgot-password', data);
export const validateUser = (data) => AuthAPI.get('/auth/validate-user', data);
