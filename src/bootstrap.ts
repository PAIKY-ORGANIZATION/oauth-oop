import dotenv from 'dotenv'



dotenv.config({path: './config/shared.env'})

const requiredENVs = [
    'MONGODB_CONNECTION_URI'
]


requiredENVs.forEach((env)=>{

    if(!process.env[env]){
        throw new Error(`Missing required environment variable: ${env}`)
    }

})