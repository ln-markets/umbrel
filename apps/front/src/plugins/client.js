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
    }
  }

  async interceptResponse(response) {
    return Promise.resolve(response)
  }

  async interceptError(error) {
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
      return response
    }
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

  async post({ path, body, options = {} }) {
    const method = 'POST'

    Object.assign(options, { body, method })
    return this.request({ path, options })
  }

  async put({ path, body, options = {} }) {
    const method = 'PUT'

    Object.assign(options, { body, method })
    return this.request({ path, options })
  }

  async get({ path, params, options = {} }) {
    const method = 'GET'

    Object.assign(options, { method })
    return this.request({ path, params, options })
  }

  async delete({ path, params, options = {} }) {
    const method = 'DELETE'

    Object.assign(options, { method })
    return this.request({ path, params, options })
  }
}
