import {routeNames} from "./routeNames";

export const vendorRoutes = [
  {
    path: '/vendors',
    name: routeNames.vendors.index,
    component: () => import('../pages/vendors/VendorList.vue'),
    children: [
      {
        path: '/vendors/filter',
        name: routeNames.vendors.filter,
        component: () => import('../pages/vendors/VendorFilter.vue'),
      },
    ],
  },
  {path: '/vendors/:id', name: routeNames.vendors.show, component: () => import('../pages/vendors/VendorShow.vue')}
];
