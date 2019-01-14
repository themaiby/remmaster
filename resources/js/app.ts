import Vue from "vue";
import Application from "./Application.vue";
import {store} from "./store/store";
import router from "./router/router";

import "@/utils/validator";
import "@/utils/vuetify";
import i18n from "./utils/i18n";

Vue.use(require('vue-moment'));

const app = new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: h => h(Application),
});
