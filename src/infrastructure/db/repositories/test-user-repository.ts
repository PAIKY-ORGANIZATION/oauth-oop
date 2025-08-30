import { User } from "../../../entities/user/user.js"
import { UserRepository } from "./user-repository-interface.js"

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


