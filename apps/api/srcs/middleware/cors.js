const cors = require('cors')

const noCorsPaths = ['/lnurl/a', '/lnurl/a/c']

const origin = (origin, callback) => {
  if (
    !origin ||
    origin.match(/^http:\/\/localhost:\d+$/) ||
    origin.match(/^http:\/\/umbrel(-dev)?.local(:\d+)?$/)
  ) {
    callback(null, true)
  } else {
    callback(new Error('Not allowed by CORS'))
  }
}

const corsOptions = {
  exposedHeaders: [
    'X-RequestId',
    'Retry-After',
    'X-RateLimit-Reset',
    'X-RateLimit-Remaining',
  ],
  origin: origin,
}

function except(paths, fn) {
  return function (req, res, next) {
    if (paths.indexOf(req.path) > -1) {
      res.header('Access-Control-Allow-Origin', '*')
    } else {
      return fn(req, res, next)
    }
  }
}

module.exports = except(noCorsPaths, cors(corsOptions))
