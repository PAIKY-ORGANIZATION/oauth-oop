import {Router } from 'express'
import { registerWithPasswordController } from './controller/register-with-password.js'
import { validator } from './middleware/validator.js'
import { transferCreditsController } from './controller/transfer-credits.js'


export const router = Router()



//¡ Validate
router.post('/register/password', validator(registerWithPasswordController))



router.post('/transfer-credits', validator(transferCreditsController))