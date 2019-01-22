import {VueRouter} from "vue-router/types/router";

export interface IMiddleware {
  next: Function;
  router: VueRouter;
}
