import { createApp } from 'vue'

import App from './App.vue'
import store from './store/index.js'
import router from './router/index.js'

import { FontAwesomeIcon } from './plugins/font-awesome.js'

import './assets/styles/index.css'

import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
import Button from './components/Button.vue'
import Modal from './components/Modal.vue'
import Slider from './components/Slider.vue'

const app = createApp(App)

app.use(store)
app.use(router)

app.component('NavHeader', Navigation)
app.component('NavFooter', Footer)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.component('LnmButton', Button)
app.component('Modal', Modal)
app.component('Slider', Slider)

app.mount('#app')
