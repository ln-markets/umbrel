const { format } = require('winston')
const context = require('./context.js')

const getContext = format((info) => {
  const store = context.getStore()
  if (store) {
    info.reqid = store.get('reqid')
    info.ip = store.get('ip')
  }
  return info
})

const isHttpRequest = format((info) => {
  if (info.message && info.message.httpRequest) {
    if (info.message.httpRequest.param) {
      info.message.httpRequest.param = JSON.stringify(
        info.message.httpRequest.param
      )
    }
    info.httpRequest = info.message.httpRequest
  }
  return info
})

const isWebsocketRequest = format((info) => {
  if (info.message && info.message.wsRequest) {
    if (info.message.wsRequest.params) {
      info.message.wsRequest.params = JSON.stringify(
        info.message.wsRequest.params
      )
    }
    info.wsRequest = info.message.wsRequest
  }
  return info
})

const isRouterRequest = format((info) => {
  if (info.message && info.message.routerRequest) {
    if (info.message.routerRequest.params) {
      info.message.routerRequest.params = JSON.stringify(
        info.message.routerRequest.params
      )
    }
    info.routerRequest = info.message.routerRequest
  }
  return info
})

const error = format((info) => {
  if (info.constructor.name === 'HttpError') {
    const HttpError = {
      message: info.message === info.code ? undefined : info.message,
      details: JSON.stringify(info.details),
      status: info.status,
      code: info.code,
    }
    return Object.assign({ HttpError }, info)
  } else if (info instanceof Error) {
    const error = {
      message: info.message,
      stack: info.stack.split('\n').slice(1).join('\n'),
    }
    return Object.assign({ error }, info)
  }
  return info
})

module.exports = format.combine(
  isHttpRequest(),
  isWebsocketRequest(),
  isRouterRequest(),
  getContext(),
  error()
)
