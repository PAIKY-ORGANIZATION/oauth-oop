import {Router } from 'express'
import { validator } from './middleware/validator'
import { registerWithPassword } from './controller/register-password'

export const router = Router()



router.get('/signin/password', validator(registerWithPassword))



