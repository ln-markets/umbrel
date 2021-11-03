import { createApp } from 'vue'

import './index.css'
import App from './App.vue'
import store from './store/index.js'
import router from './router/index.js'
import { vfmPlugin } from 'vue-final-modal'
import loadCustomComponents from '@/components/index.js'

import Notify from './plugins/notifications/index.js'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(Notify)
app.use(vfmPlugin)

loadCustomComponents(app)

const vm = app.mount('#app')
store.$vm = vm
