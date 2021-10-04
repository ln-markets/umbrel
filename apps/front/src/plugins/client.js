import Client from '../packages/client.js'

const baseUrl = () => {
  if (parseInt(window.location.port) === 3000) {
    return `http://localhost:8001`
  } else {
    return `http://${window.location.host}`
  }
}

const client = new Client({ baseUrl: baseUrl() })

export default client
