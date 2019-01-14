import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'

import {en} from '../lang/en'
import {ru} from '../lang/ru'

const validatorEn = require('vee-validate/dist/locale/en');
const validatorRu = require('vee-validate/dist/locale/ru');

Vue.use(VeeValidate, {
  locale: 'ru'
});

Validator.localize('en', validatorEn);
Validator.localize('en', en);

Validator.localize('ru', validatorRu);
Validator.localize('ru', ru);
