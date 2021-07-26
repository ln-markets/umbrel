import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes/index.js'

const options = {
  history: createWebHistory(),
  routes,
}

const router = createRouter(options)

export default router
