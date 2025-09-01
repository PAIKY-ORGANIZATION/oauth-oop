import '../bootstrap.js'
import { MongodbUserRepository } from "../infrastructure/db/repositories/mongodb-user-repository.js";
import { User } from "../entities/user/user.js";
import { FreeTier } from "../entities/user/tier-subclass.js";
import { LocalAuth } from "../entities/user/auth-subclass.js";
import { expect, test } from "vitest";

const mongodbUserRepository = new  MongodbUserRepository()

// console.log({connectionURL: process.env.MONGODB_CONNECTION_URI!});



test('Should insert user', async ()=>{

    const email = 'testEmail'

    const user = new User('testId', email, 'name', new LocalAuth('Password'), new FreeTier(), 123)

    await mongodbUserRepository.saveToPersistence(user, true)


    const foundUser = await mongodbUserRepository.findByEmail(email)

    expect(foundUser).toBeTruthy()

})