import { createRouter, createWebHistory } from 'vue-router'
import { useUserAuthStore } from '@/stores/userAuth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userAuthStore = useUserAuthStore()

  if (!userAuthStore.isAuthenticated && to.path !== '/login') {
    next('/login')
  } else if (userAuthStore.isAuthenticated && to.path === '/login') {
    next('/')
  } else {
    next()
  }
})

export default router
