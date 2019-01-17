/**
 * If user authenticated -> user & menu will stored.
 * @param next
 */
import {MiddlewareInterface} from "./MiddlewareInterface";
import {applicationStore} from "../store/modules/ApplicationStore";
import {http} from "../utils/axios";
import {apiRoutes} from "../apiRoutes";
import {usersStore} from "../store/modules/UsersStore";
import {AxiosResponse} from "axios";
import IResponse from "../models/IResponse";
import IUser from "../models/IUser";

export default async ({next}: MiddlewareInterface) => {
  if (!applicationStore.loaded) {
    try {
      const userResponse: AxiosResponse<IResponse<IUser>> = await http.get(apiRoutes.auth.getUserInfo);
      usersStore.setCurrentUser(userResponse.data.data);
      usersStore.setAuthorized(true);
    } catch (e) {
      /* ... */
    } finally {
      applicationStore.setAppLoaded();
    }
  }
  return next();
}
