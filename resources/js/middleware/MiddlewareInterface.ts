import {VueRouter} from "vue-router/types/router";

export interface MiddlewareInterface {
  next: Function;
  router: VueRouter;
}
