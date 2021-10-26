import { wait } from './utils.js'

const SOCKET_RECONECT_DELAY = 5000

export default function createWebSocketPlugin() {
  const createWebsocket = (store, reconnect) => {
    const socket = new WebSocket(store.getters['websockets/url'])

    socket.onmessage = (event) => {
      if (event.type === 'message' && event.isTrusted) {
        store.dispatch('websockets/message', event.data)
      }
    }

    socket.onopen = (event) => {
      store.dispatch('websockets/open', event)
      if (reconnect) {
        store.dispatch('websockets/reconnect', event)
      }
    }

    socket.onclose = (event) => {
      if (event.code !== 1005) {
        store.dispatch('websockets/close', event)
      }
    }

    socket.onerror = (error) => {
      console.error(error)
    }

    return socket
  }

  return (store) => {
    const queue = []

    setInterval(() => {
      if (queue.length > 0 && store.getters['websockets/isConnected']) {
        while (queue.length) {
          window.socket.send(queue.shift())
        }
      }
    }, 500)

    window.socket = createWebsocket(store)

    store.subscribe((mutation) => {
      if (mutation.type === 'websockets/SEND') {
        if (store.getters['websockets/isConnected'] && queue.length === 0) {
          window.socket.send(mutation.payload)
        } else {
          queue.push(mutation.payload)
        }
      }

      if (mutation.type === 'websockets/CLOSE') {
        window.socket = {}
        wait(SOCKET_RECONECT_DELAY).then(() => {
          window.socket = createWebsocket(store, true)
        })
      }
    })
  }
}
