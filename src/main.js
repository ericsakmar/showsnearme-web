// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import moment from 'moment'

Vue.use(VueRouter);

const routes = [
  { path: '/', component: App },
];

const router = new VueRouter({ routes });

/* eslint-disable no-new */
new Vue({
  router
}).$mount('#app');
