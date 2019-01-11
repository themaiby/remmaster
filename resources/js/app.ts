import Vue from "vue";
import Application from "./Application.vue";

const app = new Vue({
    el: '#app',
    render: h => h(Application),
});
