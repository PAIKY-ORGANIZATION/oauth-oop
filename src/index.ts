import express, { Express, Response } from 'express'
import { router } from './router'


const app: Express  = express()


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

