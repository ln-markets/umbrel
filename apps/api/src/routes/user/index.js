const express = require('express')
const isAuth = require('@/middleware/auth.js')

const router = express.Router()

router.get('/', [isAuth], require('./get.js'))
router.post('/deposit', [isAuth], require('./deposit/post.js'))
router.post('/withdraw', [isAuth], require('./withdraw/post.js'))

module.exports = router
