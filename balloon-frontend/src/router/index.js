import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// Global
import auth from '@/pages/auth'
// User
import qr from '@/pages/user/qr'
// Admin

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: auth
    },
    // user
    {
      path: '/user/qr',
      name: 'qr',
      component: qr
    }
  ]
})
