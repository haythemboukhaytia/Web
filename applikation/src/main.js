// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueCarousel from 'vue-carousel';
import jquery from 'jquery';
import Chart from 'primevue/chart';

Vue.config.productionTip = false

// we register globally
Vue.use(axios) 
Vue.use(BootstrapVue);
Vue.use(VueCarousel);
Vue.use(jquery)
Vue.use(Chart)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
