import Vue from "vue";
import Application from "./Application.vue";
import {store} from "./store/store";
import router from "./router/router";

const app = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(Application),
});
