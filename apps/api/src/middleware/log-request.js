const log = require('@/logger/index.js')

const forbidenKeys = [
  'password',
  'message',
  'k1',
  'sig',
  'signature',
  'key',
  'hmac',
  'token',
  'newPassword',
]

const parseParam = (req) => {
  let param
  if (req.method === 'GET' || req.method === 'DELETE') {
    param = Object.assign({}, req.query)
  } else {
    param = Object.assign({}, req.body)
  }

  if (process.env.NODE_ENV === 'production') {
    for (const key of forbidenKeys) {
      delete param[key]
    }
  }

  if (JSON.stringify(param) === '{}') {
    return undefined
  } else {
    return param
  }
}

module.exports = (req, res, next) => {
  const { path, method } = req
  const param = parseParam(req)
  const httpRequest = {
    method,
    path,
    param,
  }

  log.info({ httpRequest })
  next()
}
