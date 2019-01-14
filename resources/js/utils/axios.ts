import axios, {AxiosInstance} from "axios";

// Get token from session storate
const accessToken: string | null = sessionStorage.getItem('accessToken');

// Initialize axios instance
export const http: AxiosInstance = axios.create({
  headers: {Authorization: `Bearer ${accessToken}`},
  baseURL: '/api',
});

// function for setting token in axios header and sessionStorage
export const setToken = (token: string): void => {
  http.defaults.headers['Authorization'] = `Bearer ${token}`;
  sessionStorage.setItem('accessToken', token);
};

/* todo: implement interceptors */
