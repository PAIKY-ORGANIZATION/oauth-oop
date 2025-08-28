import express, { Express, Response } from 'express'
import { router } from './infrastructure/http/router'
import { RegisterWithPasswordUseCase } from './application/use-cases/register-with-password'
import { BcryptHasher} from './infrastructure/hasher'
import { TestUserRepository } from './infrastructure/db/userRepository'


const app: Express  = express()


export const registerWithPasswordUseCase = new RegisterWithPasswordUseCase(new BcryptHasher, new TestUserRepository())


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

