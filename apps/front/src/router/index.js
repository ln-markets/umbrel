import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'

const options = {
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'profile',
      component: Index,
    },
  ],
}

const router = createRouter(options)

export default router
