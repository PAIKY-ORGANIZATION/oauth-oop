import { User } from "../../entities/user/user";

class TestUserRepository {

    saveToPersistence(user: User): void {
        console.log('Saving user to persistence');
        
    }   


    async findById(id: string): Promise<User | null> {
        return null
    }

}