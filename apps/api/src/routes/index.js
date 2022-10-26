import express from 'express'

import isAuth from '#src/middleware/auth.js'

import auth from './auth/get.js'
import configuration from './configuration/get.js'
import futures from './futures/get.js'
import options from './options/get.js'
import user from './user/index.js'

const router = express.Router()

router.get('/auth', [isAuth], auth)
router.get('/futures', [isAuth], futures)
router.get('/options', [isAuth], options)
router.use('/user', user)
router.get('/configuration', configuration)

export default router
