import {routeNames} from "./routeNames";
import Auth from "../middleware/Auth";

export const orderRoutes = [
  {
    path: '/orders',
    name: routeNames.orders.index,
    component: () => import('../pages/orders/OrderList.vue'),
    meta: {middleware: [Auth]},
  },
  {
    path: '/orders/:id',
    name: routeNames.orders.show,
    component: () => import('../pages/orders/OrderShow.vue'),
    meta: {middleware: [Auth]},
  },
];


