import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [


  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('../views/Login.vue')
  },

  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('../views/Register.vue')
  },

  {
    path: '/btz_list',
    name: 'btz_list',
    meta: {layout: 'main'},
    component: () => import('../views/BtzList.vue')
  },

  {
    path: '/create_btz',
    name: 'create_btz',
    meta: {layout: 'main'},
    component: () => import('../views/CreateBtz.vue')
  },

  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main'},
    component: () => import('../views/Profile.vue')
  }



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
