import Vue from 'vue';
import Router from 'vue-router';
import {routes} from "./routes";
import {Middleware} from "../middleware/Middleware";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.APP_URL,
  routes
});

(new Middleware).register();
