import {Router } from 'express'
import { validator } from './middleware/validator'
import { registerWithPasswordController } from './controller/register-password'


export const router = Router()



router.get('/signin/password', validator(registerWithPasswordController))



