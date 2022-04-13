import HttpError from '#src/helpers/errors.js'
import log from '#src/logger/index.js'

const handleLNMarketsRestError = (error) => {
  const { message, statusCode, code } = error

  if (statusCode >= 500) {
    return internalError({ statusCode })
  }

  return {
    statusCode,
    json: {
      code,
      message,
    },
  }
}

const internalError = (opt = {}) => {
  const { statusCode = 500 } = opt

  return {
    statusCode,
    json: {
      code: 'internalError',
      message: 'Internal error.',
    },
  }
}

const parseHttpError = ({ status, code, message }) => {
  return {
    statusCode: status,
    json: {
      code,
      message: message || code,
    },
  }
}

// eslint-disable-next-line no-unused-vars
export default (error, req, res, next) => {
  let response
  log.error(error)

  if (error.name === 'LNMarketsRestError') {
    response = handleLNMarketsRestError(error)
  } else if (error instanceof HttpError) {
    response = parseHttpError(error)
  } else {
    response = internalError()
  }

  return res.status(response.statusCode).json(response.json)
}
