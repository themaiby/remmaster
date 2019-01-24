import axios, {AxiosInstance} from "axios";
import router from "../router/router";
import {routeNames} from "../router/routeNames";
import {usersStore} from "../store/modules/UsersStore";

// Initialize axios instance
export const http: AxiosInstance = axios.create({baseURL: '/api'});

http.interceptors.response.use(
  r => r,
  (r) => {
    const code = r.response.status;

    switch (code) {
      case 401:
        usersStore.setAuthorized(false);
        router.push({name: routeNames.login});
        break;
      case 404:
        router.push({name: routeNames.errors.notFound});
        break;

      default:
        return Promise.reject(r);
    }
  }
);
