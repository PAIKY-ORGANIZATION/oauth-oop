import { LocalAuth, Oauth } from "../../entities/user/auth-subclass.js";
import { FreeTier } from "../../entities/user/tier-subclass.js";
import { User } from "../../entities/user/user.js";
import { mongoClient } from "./mongodb.js";

//! Just for learning, this is what mongodb gives:
// type WithId<T> = T & { _id: ObjectId };



type LocalAuthDoc = { type: 'local'; password: string };
type OauthDoc = { type: 'oauth'; providerId: string; oauthProvider: string };
type AuthDoc = LocalAuthDoc | OauthDoc;

type UserDoc = {
  id: string;
  email: string;
  name: string;
  auth: AuthDoc;
  credits: number;      // if you persist it; otherwise compute on reconstruct
};




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

    private userCollection = mongoClient.db('oop_oauth').collection<UserDoc>('users')



    
    async findByEmail(email: string): Promise<User | null> {
        
        const foundUser: UserDoc | null = await this.userCollection.findOne({email}, {projection: {_id: 0}}) as  UserDoc | null 
    
        if(!foundUser) return null        

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
        let auth: AuthDoc

        if(user.auth instanceof Oauth){
            auth = {type: user.auth.type, providerId: user.auth.providerId, oauthProvider: user.auth.oauthProvider}
        } else if(user.auth instanceof LocalAuth){
            
        }


        const doc:  UserDoc = {
            id: user.id,
            email: user.email,
            name: user.name,
            

        }



        await this.userCollection.insertOne(user)
    }

}