const http = require('http')

const options = {
  host: 'localhost',
  port: '4242',
  timeout: 2000,
  method: 'GET',
  path: '/status',
}

const request = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`)
  if (res.statusCode === 200) {
    process.exit(0)
  } else {
    process.exit(1)
  }
})

request.on('error', function (error) {
  console.error(error)
  console.log('ERROR')
  process.exit(1)
})

request.end()
