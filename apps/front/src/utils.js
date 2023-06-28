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
