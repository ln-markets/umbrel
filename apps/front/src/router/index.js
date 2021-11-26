import { createRouter, createWebHistory } from 'vue-router'

import Profile from '@/views/profile/Index.vue'
import Authentication from '@/views/auth/Index.vue'

const options = {
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'authentication',
      component: Authentication,
    },
    {
      path: '/app',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: Authentication,
    },
  ],
}

const router = createRouter(options)

export default router
