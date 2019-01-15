import {RouteConfig} from "vue-router";
import {routeNames} from "./routeNames";
import Layout from "../pages/Layout.vue";
import VendorFilter from "../pages/vendors/VendorFilter.vue";


export const routes: RouteConfig[] = [
  {
    path: '/login',
    name: routeNames.login,
    component: () => import('@/pages/Login.vue'),
  },
  /* USER PART LAYOUT */
  {
    path: '', name: routeNames.layout, component: Layout, redirect: {name: routeNames.vendors.index}, children: [
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


      // tmp
      {path: '/dashboard', name: routeNames.home, component: VendorFilter},
      {path: '/components', name: routeNames.components.index, component: VendorFilter},
      {path: '/orders', name: routeNames.orders.index, component: VendorFilter},
      {path: '/settings', name: routeNames.settings.index, component: VendorFilter},
    ],
  }
];

