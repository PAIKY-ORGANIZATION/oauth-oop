import { RegisterWithPasswordUseCase } from './application/use-cases/register-with-password.js'
import './bootstrap.js'


import express, { Express, Response } from 'express'
import { BcryptHasher } from './infrastructure/hasher.js'
import { router } from './infrastructure/http/router.js'
import { TransferCreditsUseCase } from './application/use-cases/transfer-credits.js'
import { MongodbUserRepository } from './infrastructure/db/repositories/mongodb-user-repository.js'
import { errorMiddleware } from './infrastructure/http/middleware/express-error-mid.js'



const app: Express  = express()


const mongodbUserRepository = new MongodbUserRepository()

export const registerWithPasswordUseCase = new RegisterWithPasswordUseCase(new BcryptHasher, mongodbUserRepository)

export const transferCreditsUseCase = new TransferCreditsUseCase(mongodbUserRepository)


app.use(express.json())


app.use(errorMiddleware)

app.use((req, _res: Response, next)=>{
    console.log('New request: ', req.url);
    next()
})


app.use('/api', router)


const port = process.env.PORT || 3001

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})

