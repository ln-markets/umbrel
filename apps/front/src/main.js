import { createApp } from 'vue'

import './index.css'
import App from './App.vue'
import store from './store/index.js'
import router from './router/index.js'

import { FontAwesomeIcon } from './plugins/font-awesome.js'

import Button from './components/Button.vue'
import Modal from './components/Modal.vue'
import Slider from './components/Slider.vue'

import Notify from './plugins/notifications/index.js'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(Notify)

app.component('FontAwesomeIcon', FontAwesomeIcon)
app.component('LnmUmbrelButton', Button)
app.component('LnmUmbrelModal', Modal)
app.component('LnmUmbrelSlider', Slider)

app.mount('#app')
