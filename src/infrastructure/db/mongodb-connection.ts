import {MongoClient} from 'mongodb'


const connectionURI = process.env.MONGODB_CONNECTION_URI!

export const mongoClient = new MongoClient(connectionURI)

const connectToMongoDb = async ()=>{
    try{
        await mongoClient.connect()        
    }catch(e){
        console.error(e);	
    }
}


await connectToMongoDb()


