import { createRouter, createWebHistory } from 'vue-router'


const routes = [

  {
    path: '/',
    name: 'home',
    meta: {layout: 'main', auth: 'true'},
    component: () => import('../views/HomeView.vue')    
  },

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
    props: true,
    meta: {layout: 'main', auth: 'true'},
    component: () => import('../views/BtzList.vue')
  },

  {
    path: '/create_btz',
    name: 'create_btz',
    meta: {layout: 'main', auth: 'true'},
    component: () => import('../views/CreateBtz.vue')
  },

  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main', auth: 'true'},
    component: () => import('../views/Profile.vue')
  },

  {
    path: '/bug_report',
    name: 'bug_report',
    meta: {layout: 'main', auth: 'true'},
    component: () => import('../views/BugReport.vue')
  },

  {
    path: '/edit_btz',
    name: 'edit_btz',
    props: true,
    meta: {layout: 'main', auth: 'true'},
    component: () => import ('../views/EditBtz.vue')
  },

  {
    path: '/edit_category',
    name: 'edit_category',
    props: true,
    meta: {layout: 'main', auth: 'true'},
    component: () => import ('../views/EditCategory.vue')
  },

  {
    path: '/edit_question',
    name: 'edit_question',
    props: true,
    meta: {layout: 'main', auth: 'true'},
    component: () => import ('../views/EditQuestion.vue')
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const logged = localStorage.uId
  const requiredAuth = to.matched.some(record => record.meta.auth)

  if (requiredAuth && !logged) {
    next('/login?message=notAuthorized')
  } else {
    next()
  }
})

export default router
