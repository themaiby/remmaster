/**
 * If user authenticated -> user & menu will stored.
 * @param next
 */
import {IMiddleware} from "./IMiddleware";
import {applicationStore} from "../store/modules/ApplicationStore";
import {http} from "../plugins/axios";
import {apiRoutes} from "../apiRoutes";
import {usersStore} from "../store/modules/UsersStore";
import {AxiosResponse} from "axios";
import IResponse from "../models/IResponse";
import IUser from "../models/IUser";

export default async ({next}: IMiddleware) => {
  if (!applicationStore.loaded) {
    try {
      const userResponse: AxiosResponse<IResponse<IUser>> = await http.get(apiRoutes.auth.getUserInfo);
      usersStore.setCurrentUser(userResponse.data.data);
      usersStore.setAuthorized(true);
    } catch (e) {
      /* ... todo: add toast notification */
    } finally {
      applicationStore.setAppLoaded();
    }
  }
  return next();
}
