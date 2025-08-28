import {MongoClient} from 'mongodb'

export const connectToMongoDb = async ()=>{
    const connectionURI = process.env.MONGODB_CONNECTION_URI
    
    const client = new MongoClient(connectionURI)
    
    
    try{
        await client.connect()        
    }catch(e){
        console.error(e);	
    }

        

}



