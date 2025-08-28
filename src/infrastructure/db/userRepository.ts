import { LocalAuth } from "../../entities/user/auth-subclass";
import { PremiumTier } from "../../entities/user/tier-subclass";
import { User } from "../../entities/user/user";

interface UserRepository {
    saveToPersistence(user: User): void
    findById(id: string): Promise<User | null>
}


export class TestUserRepository implements UserRepository {

    saveToPersistence(user: User): void {
        console.log('Saving user to persistence');
        
    }   


    async findById(id: string): Promise<User | null> {
        return null

    }

    async findByEmail(email: string): Promise<User | null> {
        // return new User('id', email, 'name', new LocalAuth('password'), new PremiumTier())
        return null
    }


}