import {RouteConfig} from "vue-router";
import {routeNames} from "./routeNames";


export const routes: RouteConfig[] = [
    {
      path: '/login',
      name: routeNames.login,
      component: () => import('@/pages/Login.vue'),
    }
];

