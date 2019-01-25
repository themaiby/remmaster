import Vue from "vue";
import Application from "./Application.vue";
import {store} from "./store/store";
import router from "./router/router";

import "@/plugins/validator";
import "@/plugins/vuetify";
import i18n from "./plugins/i18n";
/*import './style.css';*/

Vue.use(require('vue-moment'));

const app = new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: h => h(Application),
});
