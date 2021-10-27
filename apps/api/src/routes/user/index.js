const express = require('express')

const router = express.Router()

router.get('/', require('./get.js'))
router.get('/token', require('./token/get.js'))
router.post('/deposit', require('./deposit/post.js'))
router.post('/withdraw', require('./withdraw/post.js'))

module.exports = router
