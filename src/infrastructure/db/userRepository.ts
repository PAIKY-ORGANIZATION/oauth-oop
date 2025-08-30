import { ClientSession } from "mongodb";
import { UserPersistence } from "../../application/interfaces/persisted-user.js";
import { LocalAuth, Oauth } from "../../entities/user/auth-subclass.js";
import { FreeTier } from "../../entities/user/tier-subclass.js";
import { User } from "../../entities/user/user.js";
import { mongoClient } from "./mongodb.js";


export interface UserRepository {
    runAsTransaction(fn: ()=> Promise<void>): Promise<void>
    saveToPersistence(user: User, isNew: boolean): Promise<void>
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
}

// prettier-ignore


export class TestUserRepository implements UserRepository {

    //$ 2 duplicate Maps is better than trying  to find by email/id in a single Map (would need to loop)
    private usersById = new Map<string, User>
    private usersByEmail = new Map<string, User>


    async runAsTransaction(fn: () => Promise<void>): Promise<void> { await fn()}
    
    async findById(id: string): Promise<User | null> {
        return this.usersById.get(id) || null
        
    }
    async findByEmail(email: string): Promise<User | null> {
        return this.usersByEmail.get(email) || null
    }
    async saveToPersistence(user: User, _isNew: boolean): Promise<void> {
        
        //$ 2 duplicate Maps is better than trying  to find by email/id in a single Map (would need to loop)
        this.usersById.set(user.toObj().id, user)
        this.usersByEmail.set(user.toObj().email, user)
    }


}


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

    //$ Why is this not part of the interface? It's not part of how a what a UserRepository does. The "TestUserRepository" doesn't implement it and  can work. This function can also ✨BE REUSED✨
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
            {projection: {_id: 0}, session: this.transactionSession}
        ) as UserPersistence | null 
        
        if(!user) return null

        return this.rehydrate(user)
    }

    async findByEmail(email: string): Promise<User | null> {
        
        const user = await this.userCollection.findOne(
            {email},
            {projection: {_id: 0}, session: this.transactionSession}
        ) as  UserPersistence | null 
    
        if(!user) return null  

        return this.rehydrate(user)
    }

    //$ I a single method for both actions because I believe it also works well in other databases such as Prisma with "prisma.upsert"
    async saveToPersistence(user: User, isNew: boolean): Promise<void> {
        const doc: UserPersistence  = user.toObj()

        if(isNew){
            this.userCollection.insertOne(doc)
        }else {
            this.userCollection.replaceOne(
                { id: user.toObj().id}, 
                doc,
                {session: this.transactionSession}
            )
        }
    }

}