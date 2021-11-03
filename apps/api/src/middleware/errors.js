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
      message: 'Internal error',
    },
  }
}

module.exports = (error, req, res, next) => {
  let response
  if (error.name === 'LNMarketsRestError') {
    response = handleLNMarketsRestError(error)
  } else {
    response = internalError()
  }

  return res.status(response.statusCode).json(response.json)
}
