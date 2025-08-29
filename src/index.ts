import { RegisterWithPasswordUseCase } from './application/use-cases/register-with-password.js'
import './bootstrap.js'


import express, { Express, Response } from 'express'
import { BcryptHasher } from './infrastructure/hasher.js'
import { MongodbUserRepository, TestUserRepository } from './infrastructure/db/userRepository.js'
import { router } from './infrastructure/http/router.js'


const app: Express  = express()


export const registerWithPasswordUseCase = new RegisterWithPasswordUseCase(new BcryptHasher, new MongodbUserRepository())


app.use(express.json())

app.use((req, _res: Response, next)=>{

    console.log('New request: ', req.url);
    next()

})


app.use('/api', router)


const port = process.env.PORT || 3001

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})

