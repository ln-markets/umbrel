import express from 'express'

import isAuth from '#src/middleware/auth.js'

import deposit from './deposit/post.js'
import user from './get.js'
import withdraw from './withdraw/post.js'

const router = express.Router()

router.get('/', [isAuth], user)
router.post('/deposit', [isAuth], deposit)
router.post('/withdraw', [isAuth], withdraw)

export default router
