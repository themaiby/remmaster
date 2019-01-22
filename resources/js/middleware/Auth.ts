import {usersStore} from "../store/modules/UsersStore";
import {IMiddleware} from "./IMiddleware";

export default async ({next}: IMiddleware) => {
  if (!usersStore.authorized) {
    return next({name: 'login'})
  }
  return next();
}

