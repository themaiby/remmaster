import axios, {AxiosInstance} from "axios";
import router from "../router/router";
import {routeNames} from "../router/routeNames";
import {usersStore} from "../store/modules/UsersStore";
import {applicationStore} from "../store/modules/ApplicationStore";
import {ISnackbarColors} from "../models/Snackbar";
import i18n from "./i18n";

// Initialize axios instance
export const http: AxiosInstance = axios.create({baseURL: '/api'});

http.interceptors.response.use(
  r => r,
  (r) => {
    const code = r.response.status;

    switch (code) {
      case 401:
        usersStore.setAuthorized(false);
        applicationStore.snackbar.call(i18n.t('messages.notAuthorized') as string, ISnackbarColors.warn);
        router.push({name: routeNames.login});
        return Promise.reject(r);

      case 404:
        applicationStore.snackbar.call(i18n.t('messages.notFound') as string, ISnackbarColors.warn);
        router.go(-1);
        return Promise.reject(r);

      case code >= 500:
        applicationStore.snackbar.call(i18n.t(r.response.data.message) as string, ISnackbarColors.warn);
        return Promise.reject(r);

      default:
        return Promise.reject(r);
    }
  }
);
