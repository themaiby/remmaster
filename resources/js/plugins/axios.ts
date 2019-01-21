import axios, {AxiosInstance} from "axios";

// Initialize axios instance
export const http: AxiosInstance = axios.create({baseURL: '/api'});
