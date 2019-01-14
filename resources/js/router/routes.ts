import {RouteConfig} from "vue-router";
import {routeNames} from "./routeNames";


export const routes: RouteConfig[] = [
    {
      path: '/vendors',
      name: routeNames.vendors.index,
      component: () => import('../pages/vendors/VendorList.vue')
    }
  ]
;

