import {Router } from 'express'
import { registerWithPasswordController } from './controller/register-with-password.js'
import { validator } from './middleware/validator.js'


export const router = Router()



//¡ Validate
router.post('/register/password', validator(registerWithPasswordController))



router.post('/transfer-credits/:userId', validator())