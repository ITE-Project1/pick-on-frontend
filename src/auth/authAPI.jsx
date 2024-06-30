import axios from "axios";

let ACCESS_TOKEN = localStorage.getItem("accessToken");

/** CREATE CUSTOM AXIOS INSTANCE */
export const AuthApi = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
});

/** LOGIN API */
export const login = async ({ username, password }) => {
    const data = { username, password };
    const response = await AuthApi.post(`/user/login`, data);
    return response.data;
}

/** SIGNUP API */
export const signUp = async ({ name, username, password, phone_number }) => {
    const data = { name, username, password, phone_number };
    const response = await AuthApi.post(`/user/register`, data);
    return response.data;
}