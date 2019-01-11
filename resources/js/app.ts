import Vue from "vue";
import Application from "./Application.vue";
import {store} from "./store/store";

const app = new Vue({
    el: '#app',
    store,
    render: h => h(Application),
});
