import Client from '../packages/client.js'

const baseUrl = () => {
  if (import.meta.env.VITE_APP_URL) {
    return `http://localhost:8001`
  } else {
    return `http://${window.location.hostname}:4242`
  }
}

const client = new Client({ baseUrl: baseUrl() })

export default client
