// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// Bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

// QR Code Reader
import VueQrcodeReader from "vue-qrcode-reader";
Vue.use(VueQrcodeReader);

// VueLoading
import loading from 'vuejs-loading-screen'

// Vuelidate
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)


Vue.use(loading, {
  bg: '#000000e0',
  icon: 'fas fa-compact-disc',
  size: 3,
  icon_color: 'white',
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
