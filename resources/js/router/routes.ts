import {RouteConfig} from "vue-router";
import {routeNames} from "./routeNames";
import Layout from "../pages/Layout.vue";


export const routes: RouteConfig[] = [
  {
    path: '/login',
    name: routeNames.login,
    component: () => import('@/pages/Login.vue'),
  },
  /* USER PART LAYOUT */
  {
    path: '', name: routeNames.layout, component: Layout, redirect: {name: routeNames.dashboard}, children: [
      /* todo: make this pages */
      {path: '/dashboard', name: routeNames.dashboard, component: () => import('../pages/Dashboard.vue')},
      {path: '/components', name: routeNames.components.index, component: () => import('../pages/Dashboard.vue')},
      {path: '/orders', name: routeNames.orders.index, component: () => import('../pages/Dashboard.vue')},
      {path: '/settings', name: routeNames.settings.index, component: () => import('../pages/Dashboard.vue')},

      /* Vendors */
      {
        path: '/vendors',
        name: routeNames.vendors.index,
        component: () => import('../pages/vendors/VendorList.vue'),
        children: [
          {
            path: '/vendors/filter',
            name: routeNames.vendors.filter,
            component: () => import('../pages/vendors/VendorFilter.vue')
          }
        ]
      },
    ],
  }
];

