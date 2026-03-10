import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userAuthentification'
import HomeView from '../views/HomeView/HomeView.vue'
import LoginView from '../views/LoginView/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

/**
 * It executes before every page change
 */
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.name) {
    next({ name: 'login' })
  } else if (to.name === 'login' && userStore.name) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
