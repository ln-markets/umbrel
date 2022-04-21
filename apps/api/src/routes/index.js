import express from 'express'

import isAuth from '#src/middleware/auth.js'

import auth from './auth/get.js'
import futures from './futures/get.js'
import login from './login/post.js'
import options from './options/get.js'
import user from './user/index.js'

const router = express.Router()

router.get('/auth', [isAuth], auth)
router.get('/futures', [isAuth], futures)
router.get('/options', [isAuth], options)
router.post('/login', login)
router.use('/user', user)

export default router
