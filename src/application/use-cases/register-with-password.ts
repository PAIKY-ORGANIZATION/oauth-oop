import { randomUUID } from "crypto";
import { LocalAuth } from "../../entities/user/auth-subclass";
import { FreeTier } from "../../entities/user/tier-subclass";
import { User } from "../../entities/user/user";
import { TestUserRepository } from "../../infrastructure/db/userRepository";
import { Hasher } from "../../infrastructure/hasher";

export class RegisterWithPasswordUseCase{

    constructor(
        private hasher: Hasher, 
        private userRepository: TestUserRepository
    ){}   
    
    
    async execute(email: string, password: string, name: string): Promise<User> {
        
        const existingUser = await this.userRepository.findByEmail(email)
        if(existingUser) throw new Error('User already exists') 
        
        const hashed = await this.hasher.hashPassword(password)

         const tier = new FreeTier()
         const auth = new LocalAuth(hashed)

        return new User(randomUUID(), email, name, auth, tier)

    }


}