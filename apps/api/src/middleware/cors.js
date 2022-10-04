import cors from 'cors'

export default cors({
  credentials: true,
  exposedHeaders: [
    'Set-Cookie',
    'Cookie',
    'X-RequestId',
    'Access-Control-Allow-Origin',
  ],
  origin: (origin, callback) => {
    callback(null, true)
  },
})
