import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log(token);
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await axios.post('http://localhost:8080/user/refresh', null, {
                headers: { Authorization: `Bearer ${refreshToken}` },
            });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.accessToken);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken;
                return instance(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export default instance;
