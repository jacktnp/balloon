import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// Global
import index from '@/pages/index'
import auth from '@/pages/auth'
// User
import qr from '@/pages/user/qr'
import profile from '@/pages/user/profile'
// Admin

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // 
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/auth',
      name: 'auth',
      component: auth
    },
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
    },
    // user
    {
      path: '/user/profile',
      name: 'profile',
      component: profile
    }
  ]
})
