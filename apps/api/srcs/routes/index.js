const express = require('express')
const router = express.Router()

router.get('/auth', require('./auth/get.js'))
router.get('/infos', require('./infos/get.js'))
router.get('/futures', require('./futures/get.js'))

router.use('/user', require('./user/index.js'))

module.exports = router
