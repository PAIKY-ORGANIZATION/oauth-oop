import { TestUserRepository } from "../../infrastructure/db/userRepository";
import { Hasher } from "../../infrastructure/hasher";

class registerWithPasswordUseCase{

    constructor(
        private hasher: Hasher, 
        private userRepository: TestUserRepository
    ){}   
    
    
    async execute(email: string) {
        
        const existingUser = await this.userRepository.findByEmail(email)
        if(existingUser) throw new Error('User already exists') 
        
            


    }


}