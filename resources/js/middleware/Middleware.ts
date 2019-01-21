import {Route} from "vue-router";
import {VueRouter} from "vue-router/types/router";
import StateInitialMiddleware from "./StateInitialMiddleware";
import router from "../router/router";

export class Middleware {
  private GlobalMiddleware: Function[] = [
    StateInitialMiddleware
  ];

  // Initialize Middleware list
  public register() {
    router.beforeEach(async (to: Route, from: Route, next: any) => {
      let middlewareList: Function[];

      middlewareList = to.meta.middleware
        ? [...this.GlobalMiddleware, ...to.meta.middleware]
        : [...this.GlobalMiddleware];

      const context = {to, from, next, router};
      const nextMiddleware = this.nextFactory(context, middlewareList, 1);
      return await middlewareList[0]({...context, next: nextMiddleware});
    });
  }

  /**
   * @param context
   * @param middlewareList
   * @param index
   */
  private nextFactory(context: { next: any; router: VueRouter; from: Route; to: Route }, middlewareList: Function[], index: number) {
    const subSequentMiddleware = middlewareList[index];
    if (!subSequentMiddleware) return context.next;

    return async (...parameters: any) => {
      context.next(...parameters);
      const nextMiddleware = this.nextFactory(context, middlewareList, index + 1);
      await subSequentMiddleware({...context, next: nextMiddleware});
    };
  }
}
