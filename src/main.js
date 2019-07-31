// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

import './bus';
import VeeValidate from 'vee-validate';
import VueI18n from 'vue-i18n';
import zhTW from 'vee-validate/dist/locale/zh_TW';

import App from './App'
import router from './router'


Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'zhTW'
});

Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    zhTW
  }
});

Vue.component('loading', Loading)
Vue.filter('currency', currencyFilter)
Vue.filter('date', dateFilter);


/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next)
  if (to.meta.requiresAuth) {
    console.log('這裡需要驗證')
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then(response => {
      console.log(response.data);
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    });
  } else {
    next()
  }
})