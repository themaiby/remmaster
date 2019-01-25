import Vue from "vue";
import Vuetify from 'vuetify';
/*import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';*/
// Helpers
import ru from 'vuetify/src/locale/ru';
import en from 'vuetify/src/locale/en';

Vue.use(Vuetify, {
/*  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },*/
  customProperties: true,
  iconfont: 'mdi',
  lang: {
    locales: { ru, en },
    current: 'ru'
  },
});
