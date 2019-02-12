/**
 * If user authenticated -> user & menu will stored.
 * @param next
 */
import {IMiddleware} from "./IMiddleware";
import {applicationStore} from "../store/modules/ApplicationStore";
import {usersStore} from "../store/modules/UsersStore";
import {User} from "../models/User";

export default async ({next}: IMiddleware) => {
  if (!applicationStore.loaded) {
    try {
      const user = await User.getCurrent();
      usersStore.setCurrentUser(user.data);
      usersStore.setAuthorized(true);
    } catch (e) {
      /* ... todo: add toast notification */
    } finally {
      applicationStore.setAppLoaded();
    }
  }
  return next();
}
