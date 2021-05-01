import Vue from 'vue'
import Router from 'vue-router'
// Global
import index from '@/pages/index'
import auth from '@/pages/auth'
import logout from '@/pages/logout'
// User
import userindex from '@/pages/user/index'
import userbrowse from '@/pages/user/browse'
import supporterActive from '@/pages/user/supporter-active'
import userprofile from '@/pages/user/profile'
// Admin
import adminindex from '@/pages/admin/index'
import adminmanagement from '@/pages/admin/management'
import adminaddequipment from '@/pages/admin/addEquipment'
import adminadddevice from '@/pages/admin/addDevice'
import adminprofile from '@/pages/admin/profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // Global
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
    // Admin
    {
      path: '/admin',
      name: 'adminindex',
      component: adminindex
    },
    {
      path: '/admin/management',
      name: 'adminmanagement',
      component: adminmanagement
    },
    {
      path: '/admin/management/add',
      name: 'adminaddequipment',
      component: adminaddequipment
    },
    {
      path: '/admin/management/:id',
      name: 'adminadddevice',
      component: adminadddevice
    },
    {
      path: '/admin/profile',
      name: 'adminprofile',
      component: adminprofile
    },
    {
      path: '/logout',
      name: 'logout',
      component: logout
    },
  ]
})
