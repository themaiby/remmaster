import {MiddlewareInterface} from "./MiddlewareInterface";
import {usersStore} from "../store/modules/UsersStore";

export default ({next}: MiddlewareInterface) => {
  if (usersStore.authorized) {
    return next({name: 'dashboard'})
  } else {
    return next();
  }
}

