const { format } = require('winston')
const { combine, timestamp, printf, colorize } = format

module.exports = () => {
  const consolePrint = printf((info) => {
    const {
      timestamp,
      level,
      message,
      reqid,
      ip,
      HttpError,
      error,
      httpRequest,
      wsRequest,
      routerRequest,
    } = info

    let base = `ts="${timestamp}"`
    base += ` level="${level}"`.padEnd(24)
    if (reqid) base += ` reqid="${reqid}"`
    if (ip) base += ` ip="${ip}"`

    // Error
    if (error) {
      return base + ` msg="${error.message}"`
    }

    // HTTP Error
    if (HttpError) {
      const { status, code, message, details } = HttpError
      base += ` status="${status}"`
      if (code) base += ` code="${code}"`
      if (message) base += ` msg="${message}"`
      if (details) base += ` details="${details}"`
      return base
    }

    // Router request
    if (routerRequest) {
      const { method, params } = routerRequest
      base += ` method="${method}"`
      if (params) base += ` params="${params}"`
      return base
    }

    // Websocket request
    if (wsRequest) {
      const { method, params } = wsRequest
      base += ` method="${method}"`
      if (params) base += ` params="${params}"`
      return base
    }

    // HTTP Request
    if (httpRequest) {
      const { method, param, path } = httpRequest
      base += ` method="${method}" path="${path}"`
      if (param) base += ` params="${param}"`
      return base
    }

    // Message is object
    if (typeof message === 'object')
      return base + ` obj="${JSON.stringify(message, null, 0)}"`

    return base + ` msg="${message}"`
  })

  const consoleOptions = {
    format: combine(colorize(), timestamp(), consolePrint),
  }

  return consoleOptions
}
