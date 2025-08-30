import { Hasher } from "../../infrastructure/hasher.js";
import { UserRepository } from "../../infrastructure/db/userRepository.js";
import { User } from "../../entities/user/user.js";
import { FreeTier } from "../../entities/user/tier-subclass.js";
import { LocalAuth } from "../../entities/user/auth-subclass.js";

export class RegisterWithPasswordUseCase{

    constructor(
        private hasher: Hasher, 
        private userRepository: UserRepository
    ){}   
    
    async execute(email: string, password: string, name: string): Promise<User> {
        
        const existingUser = await this.userRepository.findByEmail(email)
        if(existingUser) throw new Error('User already exists') 
        
        const hashed = await this.hasher.hashPassword(password)

        const tier = new FreeTier()
        const auth = new LocalAuth(hashed)

        const user =  User.createUser({email, name, auth, tier})

        await this.userRepository.saveToPersistence(user, true)

        return user

    }
}