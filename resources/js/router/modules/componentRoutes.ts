import {routeNames} from "../routeNames";
import Auth from "../../middleware/Auth";
import {RouteConfig} from "vue-router";

export const componentRoutes: RouteConfig[] = [
  {
    path: '/components',
    name: routeNames.components.index,
    component: () => import('../../pages/components/ComponentList.vue'),
    meta: {middleware: [Auth]},
    children: [
      {
        path: '/components/filter',
        name: routeNames.components.filter,
        component: () => import('../../pages/components/ComponentFilter.vue'),
      },
      {
        path: '/components/create',
        name: routeNames.components.create,
        component: () => import('../../pages/components/ComponentCreate.vue'),
      },
    ],
  },
  {
    path: '/components/:id',
    name: routeNames.components.show,
    component: () => import('../../pages/components/ComponentShow.vue'),
    meta: {middleware: [Auth]},
    children: [
      {
        path: '/components/:id/edit',
        name: routeNames.components.update,
        component: () => import('../../pages/components/ComponentEdit.vue')
      }
    ]
  }
];


