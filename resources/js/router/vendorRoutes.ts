import {routeNames} from "./routeNames";
import Auth from "../middleware/Auth";

export const vendorRoutes = [
  {
    path: '/vendors',
    name: routeNames.vendors.index,
    component: () => import('../pages/vendors/VendorList.vue'),
    meta: {middleware: [Auth]},
    children: [
      {
        path: '/vendors/filter',
        name: routeNames.vendors.filter,
        component: () => import('../pages/vendors/VendorFilter.vue'),
      },
    ],
  },
  {
    path: '/vendors/:id',
    name: routeNames.vendors.show,
    component: () => import('../pages/vendors/VendorShow.vue'),
    meta: {middleware: [Auth]},
  }
];


