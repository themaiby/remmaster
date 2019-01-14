import Vue from 'vue'
import VueI18n, {LocaleMessages} from 'vue-i18n'
import {ru} from "../lang/ru";
import {en} from "../lang/en";

Vue.use(VueI18n);

const messages: LocaleMessages = {ru, en};

export const trans: VueI18n = new VueI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages
});

export default trans;
