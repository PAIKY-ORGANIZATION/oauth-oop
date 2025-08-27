import {Router } from 'express'
import { validator } from './middleware/validator'
import { signInPassword } from './controller/signin-password'

export const router = Router()



router.get('/signin/password', validator(signInPassword))



