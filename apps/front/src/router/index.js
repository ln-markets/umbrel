import { createRouter, createWebHistory } from 'vue-router'

import Profile from '@/views/profile/Index.vue'

const options = {
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: () => {
        return { path: '/app' }
      },
    },
    {
      path: '/app',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => {
        return { path: '/app' }
      },
    },
  ],
}

const router = createRouter(options)

export default router
