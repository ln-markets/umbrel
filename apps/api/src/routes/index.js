const express = require('express')
const isAuth = require('@/middleware/auth.js')

const router = express.Router()

router.get('/auth', [isAuth], require('./auth/get.js'))
router.get('/futures', [isAuth], require('./futures/get.js'))
router.post('/login', require('./login/post.js'))
router.use('/user', require('./user/index.js'))

module.exports = router
