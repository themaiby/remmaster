import {RouteConfig} from "vue-router";
import {routeNames} from "./routeNames";
import Layout from "../pages/Layout.vue";
import {vendorRoutes} from "./vendorRoutes";

import {componentRoutes} from "./componentRoutes";
import Guest from "../middleware/Guest";
import {orderRoutes} from "./orderRoutes";


export const routes: RouteConfig[] = [
  {
    path: '/login',
    name: routeNames.login,
    component: () => import('@/pages/Login.vue'),
    meta: {middleware: [Guest]}
  },
  /* USER PART LAYOUT */
  {
    path: '', name: routeNames.layout, component: Layout, redirect: {name: routeNames.dashboard}, children: [
      /* todo: make this pages */
      {path: '/dashboard', name: routeNames.dashboard, component: () => import('../pages/Dashboard.vue')},
      {path: '/settings', name: routeNames.settings.index, component: () => import('../pages/Dashboard.vue')},

      ...componentRoutes,
      ...vendorRoutes,
      ...orderRoutes,
    ],
  },

  {path: '*', component: () => import('../pages/errors/Err404.vue'), name: routeNames.errors.notFound}
];

