import axios from "axios";

export const goitApi = axios.create({
    baseURL: 'https://connections-api.goit.global/',
})


export const setAuthHeader = (token) => {
    goitApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};


export const clearAuthHeader = () => {
    goitApi.defaults.headers.common.Authorization = '';
};

