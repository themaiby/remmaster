import {usersStore} from "../store/modules/UsersStore";
import {MiddlewareInterface} from "./MiddlewareInterface";

export default async ({next}: MiddlewareInterface) => {
  if (!usersStore.authorized) {
    return next({name: 'login'})
  }
  return next();
}

