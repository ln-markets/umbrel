const getApiUrl = () => {
  if (import.meta.env.MODE === 'development') {
    return 'http://localhost:8001'
  } else {
    return `http://${window.location.host}`
  }
}

export const fetchWrapper = async ({ path, method } = {}) => {
  const options = {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const response = await fetch(`${getApiUrl()}${path}`, options)

  if (response.ok) {
    if (
      response.headers.get('Content-Type') === 'application/json; charset=utf-8'
    ) {
      return response.json()
    }
    return response.text()
  }

  const error = await response.text()

  throw new Error(error)
}

export const correct = async () => {
  try {
    const { hostname, token } = await fetchWrapper({ path: '/correct' })
    window.open(`https://${hostname}/login/token?token=${token}`, '_blank')
  } catch (error) {
    console.error(error)
  }
}

export const deprecated = async () => {
  try {
    const { hostname, token } = await fetchWrapper({ path: '/deprecated ' })
    window.open(`https://${hostname}/login/token?token=${token}`, '_blank')
  } catch (error) {
    console.error(error)
  }
}
