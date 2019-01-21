import {IMiddleware} from "./IMiddleware";
import {usersStore} from "../store/modules/UsersStore";

export default ({next}: IMiddleware) => {
  if (usersStore.authorized) {
    return next({name: 'dashboard'})
  } else {
    return next();
  }
}

