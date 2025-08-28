import {Router } from 'express'
import { validator } from './middleware/validator'
import { registerWithPasswordController } from './controller/register-with-password'


export const router = Router()



//¡ Validate
router.post('/register/password', validator(registerWithPasswordController))



