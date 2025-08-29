import { ClientSession } from "mongodb";
import { UserPersistence } from "../../application/interfaces/persisted-user.js";
import { LocalAuth, Oauth } from "../../entities/user/auth-subclass.js";
import { FreeTier } from "../../entities/user/tier-subclass.js";
import { User } from "../../entities/user/user.js";
import { mongoClient } from "./mongodb.js";




export interface UserRepository {
    runAsTransaction(fn: ()=> Promise<void>): Promise<void>
    rehydrate(user: UserPersistence): User
    saveToPersistence(user: User): Promise<void>
    findById(id: string): Promise<User>
    findByEmail(email: string): Promise<User>
}

// export class TestUserRepository implements UserRepository {

//     async saveToPersistence(user: User): Promise<void> {
//         console.log('Saving user to persistence: ', user);
        
//     }   




//     async findByEmail(email: string): Promise<User | null> {

//         email


//         // return new User('id', email, 'name', new LocalAuth('password'), new PremiumTier())
//         return null
//     }


// }

//prettier-ignore


export class MongodbUserRepository implements UserRepository {

    private userCollection = mongoClient.db('oop_oauth').collection<UserPersistence>('users')

    private transactionSession: ClientSession | undefined 

    async runAsTransaction(fn: ()=>Promise<void>) {

        try{
            this.transactionSession = mongoClient.startSession()
    
            await this.transactionSession.withTransaction(fn)
            
        }catch(e){
            throw new Error('Transaction rolled back with error: ' + e)	
        }finally{
            this.transactionSession?.endSession()
            this.transactionSession = undefined
        }

    }

    rehydrate(user: UserPersistence): User {
        
        let auth
        if(user.auth.type === 'local') {
            auth = new LocalAuth(user.auth.password)
        }else {
            auth = new Oauth(user.auth.providerId, user.auth.oauthProvider)
        }
        
        return new User(user.id, user.email, user.name, auth, new FreeTier())
    }


    async findById(id: string):  Promise<User> {
        const user = await this.userCollection.findOne(
            {id}, 
            {projection: {_id: 0}}
        ) as UserPersistence | null 
        
        if(!user) throw new Error('User not found')   //? Throw specific error instance

        return this.rehydrate(user)
    }

    async findByEmail(email: string): Promise<User> {
        
        const user = await this.userCollection.findOne(
            {email},
            {projection: {_id: 0}}
        ) as  UserPersistence | null 
    
        if(!user) throw new Error('User not found')   //? Throw specific error instance

        return this.rehydrate(user)
    }

    async saveToPersistence(user: User): Promise<void> {
        const doc: UserPersistence  = user.toObj()
        await this.userCollection.insertOne(doc, {
            session: this.transactionSession
        })
    }

}