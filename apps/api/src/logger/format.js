const { format } = require('winston')
const context = require('@/helpers/context.js')

const getContext = format((info) => {
  const store = context.getStore()

  if (store) {
    info.reqid = store.get('reqid')
    info.ip = store.get('ip')
  }

  return info
})

const isHttpError = format((info) => {
  // Catch only HttpError
  if (info.constructor.name === 'HttpError' && !info.error) {
    const { status, code, message } = info
    info.error = `status=${status} code=${code} message=${message}`
  }

  return info
})

const isError = format((info) => {
  // Catch all class that inherit from Error class
  if (info instanceof Error && !info.error) {
    const { message, stack } = info
    info.error = `msg=${message}\n${stack.split('\n').slice(1).join('\n')}`
  }

  return info
})

module.exports = format.combine(getContext(), isHttpError(), isError())
