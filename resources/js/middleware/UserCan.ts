import {IMiddleware} from "./IMiddleware";
import {usersStore} from "../store/modules/UsersStore";
import {routeNames} from "../router/routeNames";
import {User} from "../models/User";

const user: User = usersStore.currentUser;

// Middleware generator
export default async (action: string) => {
  return async ({next}: IMiddleware) => {
    return user.can(action) ? next() : next({name: routeNames.login}); // todo: make restriction page?
  }
};
