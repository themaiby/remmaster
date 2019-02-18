import {routeNames} from "../routeNames";
import Auth from "../../middleware/Auth";
import {RouteConfig} from "vue-router";

export const orderRoutes: RouteConfig[] = [
  {
    path: '/orders',
    name: routeNames.orders.index,
    component: () => import('../../pages/orders/OrderList.vue'),
    meta: {middleware: [Auth]},
    children: [
      {
        path: '/orders/create',
        name: routeNames.orders.create,
        component: () => import('../../pages/orders/OrderCreate.vue')
      }
    ]
  },
  {
    path: '/orders/:id',
    name: routeNames.orders.show,
    component: () => import('../../pages/orders/OrderShow.vue'),
    meta: {middleware: [Auth]},
  },
];


