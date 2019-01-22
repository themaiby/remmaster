import {IMiddleware} from "./IMiddleware";
import IUser from "../models/IUser";
import {usersStore} from "../store/modules/UsersStore";
import {userHelper} from "../utils/UserHelpers";
import {routeNames} from "../router/routeNames";

const user: IUser = usersStore.currentUser;

// Middleware generator
export default async (action: string) => {
  return async ({next}: IMiddleware) => {
    return userHelper.can(user, action) ? next() : next({name: routeNames.login}); // todo: make restriction page?
  }
};
