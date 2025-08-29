import { UserPersistence } from "../../application/interfaces/persisted-user.js";
import { LocalAuth, Oauth } from "../../entities/user/auth-subclass.js";
import { FreeTier } from "../../entities/user/tier-subclass.js";
import { User } from "../../entities/user/user.js";
import { mongoClient } from "./mongodb.js";

//! Just for learning, this is what mongodb gives:
// type WithId<T> = T & { _id: ObjectId };



export interface UserRepository {

    // toPersistence(user: User): UserToPersistence
    saveToPersistence(user: User): Promise<void>
    // findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
}


export class TestUserRepository implements UserRepository {

    async saveToPersistence(user: User): Promise<void> {
        console.log('Saving user to persistence: ', user);
        
    }   




    async findByEmail(email: string): Promise<User | null> {

        email


        // return new User('id', email, 'name', new LocalAuth('password'), new PremiumTier())
        return null
    }


}


export class MongodbUserRepository implements UserRepository {

    private userCollection = mongoClient.db('oop_oauth').collection<UserPersistence>('users')



    
    async findByEmail(email: string): Promise<User | null> {
        
        const foundUser: UserPersistence | null = await this.userCollection.findOne({email}, {projection: {_id: 0}}) as  UserPersistence | null 
    
        if(!foundUser) return null        


        console.log({foundUser});
        

        let user
        let auth

        if(foundUser.auth.type === 'local') {
            auth = new LocalAuth(foundUser.auth.password)
        }else {
            auth = new Oauth(foundUser.auth.providerId, foundUser.auth.oauthProvider)
        }
        
        user = new User(foundUser.id, foundUser.email, foundUser.name, auth, new FreeTier())
        return user
    }

    async saveToPersistence(user: User): Promise<void> {

        // if(user.auth instanceof Oauth){
        //     auth = {type: user.auth.type, providerId: user.auth.providerId, oauthProvider: user.auth.oauthProvider}
        // } else if(user.auth instanceof LocalAuth){
        //     auth = {type: user.auth.type, password: user.auth.getPassword()}
        // }

        // let tier

        // if(user.tier instanceof FreeTier){
        //     tier = {name: user.tier.name, baseCredits: user.tier.baseCredits}
        // } else if(user.tier instanceof PremiumTier){
        //     tier = {name: user.tier.name, baseCredits: user.tier.baseCredits, creditLimit: user.tier.creditLimit}
        // }


        const doc: UserPersistence  = {
            id: user.id,
            email: user.email,
            name: user.name,
            auth: user.auth.toPersistence(),
            credits: user.credits,
            tier: user.tier
        }



        await this.userCollection.insertOne(doc)
    }

}