export default {
  url: () => {
    if (import.meta.env.MODE === 'development') {
      return 'ws://localhost:8001'
    } else {
      return `ws://${window.location.host}`
    }
  },

  isConnected: (state) => {
    return state.connected
  },
}
