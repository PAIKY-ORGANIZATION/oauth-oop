import { User } from "../../../entities/user/user.js";


export interface UserRepository {
    runAsTransaction(fn: ()=> Promise<void>): Promise<void>
    saveToPersistence(user: User, isNew: boolean): Promise<void>
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
}

// prettier-ignore


