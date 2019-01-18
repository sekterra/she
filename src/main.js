import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/ko';

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import './mock' // simulation data
/** import npm module **/
import 'babel-polyfill'
/** /import npm module **/

/** import npm module **/
import lodash from 'lodash';  // A modern JavaScript utility library delivering modularity, performance & extras
import format from 'string-format'; // string-format is a small JavaScript library for formatting strings, based on Python's 
import numeral from 'numeral';
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faAngleLeft, faGenderless, faAddressCard, faListAlt, faUserEdit, faCircle, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'jquery';
/** /import npm module **/

/** font awesome setting **/
library.add(faAngleRight);
library.add(faAngleLeft);
library.add(faGenderless);
library.add(faAddressCard);
library.add(faListAlt);
library.add(faUserEdit);
library.add(faCircle);
library.add(faSearch);
library.add(faTimes);
/** font awesome setting **/

/** import vue bootstrap **/
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import 'bootstrap-xxl/dist/css/bootstrap.css'
import 'bootstrap-xxl/dist/js/bootstrap.min.js'
/** import vue bootstrap **/

/** import js **/
import httpRequest from '@/js/http';  // Promise based HTTP client for the browser and node.js
import backendConfig from '@/js/backendConfig.js';
import comm from '@/js/common.js';
/** /import js **/

/** import custom vue component **/
import YText from '@/components/YText';
import YSelect from '@/components/YSelect';
import YBtn from '@/components/YBtn';
import YDatepicker from '@/components/YDatepicker';
import YRadio from '@/components/YRadio';
import YTextarea from '@/components/YTextarea';
import YDurationpicker from '@/components/YDurationpicker';
import YMultiSelect from '@/components/YMultiSelect';
import YNumber from '@/components/YNumber';
import YCheckbox from '@/components/YCheckbox';
import YExpandSearch from '@/components/YExpandSearch';
import YDataTable from '@/components/YDataTable';
import YSwitch from '@/components/YSwitch';
import YLabel from '@/components/YLabel';
import YSuttleBox from '@/components/YSuttleBox';
import YLoader from '@/components/YLoader';
import YPopup from '@/components/YPopup';
/** /import custom vue component **/

import * as filters from './filters' // global filters

// TODO : ElementUI 한국어 설정
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value),
  locale
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(VeeValidate, { fieldsBagName: 'veeBag' });
Vue.use(BootstrapVue);

/** Global Custom Component **/
Vue.component('f-icon', FontAwesomeIcon);
Vue.component(YText.name, YText);
Vue.component(YSelect.name, YSelect);
Vue.component(YDatepicker.name, YDatepicker);
Vue.component(YRadio.name, YRadio);
Vue.component(YDurationpicker.name, YDurationpicker);
Vue.component(YTextarea.name, YTextarea);
// Vue.component(YPopup.name, YPopup);
Vue.component(YMultiSelect.name, YMultiSelect);
Vue.component(YNumber.name, YNumber);
Vue.component(YCheckbox.name, YCheckbox);
Vue.component(YExpandSearch.name, YExpandSearch);
Vue.component(YDataTable.name, YDataTable);
Vue.component(YBtn.name, YBtn);
Vue.component(YSwitch.name, YSwitch);
Vue.component(YLabel.name, YLabel);
Vue.component(YSuttleBox.name, YSuttleBox);
Vue.component(YLoader.name, YLoader);
Vue.component(YPopup.name, YPopup);

/** Global Custom Component **/

/** global variable in Vue app **/
Vue.prototype.$_ = lodash;
Vue.prototype.$format = format;
Vue.prototype.$numeral = numeral;
Vue.prototype.$http = httpRequest;
Vue.prototype.$backend = backendConfig;
Vue.prototype.$comm = comm;
/** /global variable in Vue app **/

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
