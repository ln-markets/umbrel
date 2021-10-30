import Client from './client.js'

const baseUrl = () => {
  if (import.meta.env.MODE === 'development') {
    return 'http://localhost:8001'
  } else {
    return `http://${window.location.host}`
  }
}

const client = new Client({ baseUrl: baseUrl() })

export default client
