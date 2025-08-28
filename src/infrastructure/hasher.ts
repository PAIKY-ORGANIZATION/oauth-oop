import bcrypt from 'bcrypt'

export interface Hasher {
    hashPassword(password: string): Promise<string>
    compare(plain: string, hash: string): Promise<boolean>
}



export class BcryptHasher implements Hasher {

    async hashPassword(password: string): Promise<string>{
        const saltRounds = 10
        return  await bcrypt.hash(password, saltRounds)
    }

    compare(plain: string, hash: string): Promise<boolean> {

        return bcrypt.compare(plain, hash)

    }

}