import axios, {AxiosInstance} from "axios";
import router from "../router/router";
import {routeNames} from "../router/routeNames";
import {usersStore} from "../store/modules/UsersStore";
import {snack} from "../utils/snack";

// Initialize axios instance
export const http: AxiosInstance = axios.create({baseURL: '/api'});

http.interceptors.response.use(
  r => r,
  (r) => {
    const code = r.response.status;

    switch (code) {
      case 401:
        usersStore.setAuthorized(false);
        snack.warn('messages.notAuthorized');
        router.push({name: routeNames.login});
        break;
      case 404:
        snack.warn('messages.notFound');
        router.go(-1);
        break;

      default:
        snack.err(r.response.data.message);
        return Promise.reject(r);
    }
  }
);
