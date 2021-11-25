const HttpRequestError = class HttpRequestError extends Error {
  constructor({ status, code, message, details, id, path }) {
    if (!status) throw new Error('An HTTP Error need a status')
    if (!code) code = status

    super(code)

    this.name = 'HttpRequestError'
    this.status = status
    this.code = code
    this.id = id
    this.path = path

    if (message) this.message = message
    if (details) this.details = details
  }
}

export default class Client {
  constructor(options = {}) {
    if (options.baseUrl) {
      this.baseUrl = options.baseUrl
    }

    if (options.version) {
      this.version = options.version
    }

    this.defaultOptions = {
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      }),
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
    }
  }

  interceptResponse(response) {
    return Promise.resolve(response)
  }

  interceptError(error) {
    return Promise.reject(error)
  }

  async parseResponse(response) {
    if (response.ok) {
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const text = await response.text()
        return JSON.parse(text)
      } else {
        return response.text()
      }
    } else {
      return this.parseError(response)
    }
  }

  async parseError(error) {
    const text = await error.text()
    const url = new URL(error.url)
    const { pathname: path } = url
    const { status } = error

    try {
      const { code, message, details } = JSON.parse(text)
      return Promise.reject(
        new HttpRequestError({
          status,
          code,
          message: message || text,
          details,
          path,
        })
      )
    } catch (_) {}

    if (status) {
      return Promise.reject(
        new HttpRequestError({
          status,
          message: text,
          path,
        })
      )
    }

    return Promise.reject(error)
  }

  request({ path, params, options = {} }) {
    Object.assign(options, this.defaultOptions)

    path = `${this.version || ''}${path}`
    const url = new URL(path, this.baseUrl)
    url.search = new URLSearchParams(params)

    if (typeof options.body === 'object') {
      options.body = JSON.stringify(options.body)
    }

    return fetch(url, options)
      .then((response) => {
        return this.parseResponse(response)
      })
      .then((response) => {
        return this.interceptResponse(response)
      })
      .catch((error) => {
        return this.interceptError(error)
      })
  }

  post({ path, body, options = {} }) {
    const method = 'POST'

    Object.assign(options, { body, method })
    return this.request({ path, options })
  }

  put({ path, body, options = {} }) {
    const method = 'PUT'

    Object.assign(options, { body, method })
    return this.request({ path, options })
  }

  get({ path, params, options = {} }) {
    const method = 'GET'

    Object.assign(options, { method })
    return this.request({ path, params, options })
  }

  delete({ path, params, options = {} }) {
    const method = 'DELETE'

    Object.assign(options, { method })
    return this.request({ path, params, options })
  }
}
