import Notifications from './Notifications.vue'
import events from './events.js'

export default {
  install(app) {
    app.component('Notifications', Notifications)

    app.config.globalProperties.$notify = (params) => {
      if (typeof params === 'string') {
        params = { type: 'info', message: params }
      }

      if (typeof params === 'object') {
        events.emit('add', params)
      }
    }
  },
}
