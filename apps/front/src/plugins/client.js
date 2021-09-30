import Client from '../packages/client.js'

const baseUrl = () => {
  if (import.meta.env.VITE_APP_URL) {
    return `http://localhost:8001`
  } else if (window.location.hostname.includes('.onion')) {
    return `http://${window.location.hostname}`
  } else {
    return `http://${window.location.hostname}:${process.APP_LNMMARKETS_PORT}`
  }
}

const client = new Client({ baseUrl: baseUrl() })

export default client
