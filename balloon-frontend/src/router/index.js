import Vue from 'vue'
import Router from 'vue-router'
// Global
import index from '@/pages/index'
import auth from '@/pages/auth'
// User
import userindex from '@/pages/user/index'
import userbrowse from '@/pages/user/browse'
import supporterActive from '@/pages/user/supporter-active'
import userprofile from '@/pages/user/profile'
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
    // user
    {
      path: '/user',
      name: 'userindex',
      component: userindex
    },
    {
      path: '/user/active',
      name: 'supporterActive',
      component: supporterActive
    },
    {
      path: '/user/browse',
      name: 'userbrowse',
      component: userbrowse
    },
    {
      path: '/user/profile',
      name: 'userprofile',
      component: userprofile
    },
  ]
})
