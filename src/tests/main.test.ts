import {test, expect} from "vitest";
import { BcryptHasher } from "../infrastructure/hasher.js";
import { RegisterWithPasswordUseCase } from "../application/use-cases/register-with-password.js";
import { User } from "../entities/user/user.js";
import { TestUserRepository } from "../infrastructure/db/repositories/test-user-repository.js";
import { TransferCreditsUseCase } from "../application/use-cases/transfer-credits.js";



const userRepository = new TestUserRepository()

const registerWithPasswordUseCase = new RegisterWithPasswordUseCase(new BcryptHasher(), userRepository)


const transferCreditsUseCase = new TransferCreditsUseCase(userRepository)


test('Should register user', async()=>{
    
    
    const email = 'lol@email.com'

    await registerWithPasswordUseCase.execute(email, 'my_password', 'my_name')

    const foundUser:  User  = await userRepository.findByEmail(email) as User

    expect(foundUser.toObj().email).toBe(email)
    expect(foundUser.toObj().credits).toBe(100)

})



test('Should transfer credits', async()=>{

    const amountToTransfer = 33


    const senderUser = await registerWithPasswordUseCase.execute('test1', 'test1', 'test1')
    const receiverUser = await registerWithPasswordUseCase.execute('test2', 'test2', 'test2')

    await transferCreditsUseCase.execute(amountToTransfer, senderUser.toObj().id, receiverUser.toObj().id)

    //* Expected that the amount of credits of the receiver user is its tier's "baseCredits" amount plus what it received.
    expect(receiverUser.toObj().credits)
        .toBe(receiverUser.tier.baseCredits + amountToTransfer)


})