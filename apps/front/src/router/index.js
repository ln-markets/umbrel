import { createRouter, createWebHistory } from 'vue-router'
import Profile from '@/views/Profile.vue'

const options = {
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'profile',
      component: Profile,
    },
  ],
}

const router = createRouter(options)

export default router
