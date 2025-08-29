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
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
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
        
        const auth = user.auth.type === 'local' ?
            new LocalAuth(user.auth.password) :
            new Oauth(user.auth.providerId, user.auth.oauthProvider)

        const tier = user.tierType === 'free'? new FreeTier() : new FreeTier()


        return new User(user.id, user.email, user.name, auth, tier, user.credits)
    }


    async findById(id: string):  Promise<User | null> {
        const user = await this.userCollection.findOne(
            {id}, 
            // {projection: {_id: 0}}
        ) as UserPersistence | null 
        
        console.log({user});
        if(!user) return null

        return this.rehydrate(user)
    }

    async findByEmail(email: string): Promise<User | null> {
        
        const user = await this.userCollection.findOne(
            {email},
            {projection: {_id: 0}}
        ) as  UserPersistence | null 
    
        


        if(!user) return null  

        return this.rehydrate(user)
    }

    async saveToPersistence(user: User): Promise<void> {
        const doc: UserPersistence  = user.toObj()
        await this.userCollection.updateOne(doc, {
            session: this.transactionSession
        }, {upsert: true})
    }

}