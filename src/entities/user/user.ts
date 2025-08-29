import { randomUUID } from "crypto"
import { UserPersistence } from "../../application/interfaces/persisted-user.js"
import { AuthType } from "./auth-subclass.js"
import { TierType } from "./tier-subclass.js"



type createUserParams = {
    email: string
    name: string
    auth: AuthType
    tier: TierType
}


export class User {
    
    
    constructor(
        private id: string,
        private readonly email: string,
        private name: string,
        private readonly auth: AuthType,
        private tier: TierType,
        private credits: number
    ){}

    // tryCancelTier(){
    //     if("cancelTier" in this.tier){ //$ Only if the tier supports cancellation
    //         (this.tier as PremiumTier).cancelTier()
    //     }
        
    //     else {  throw new Error("Tier does not support cancellation")}
    // }

    static createUser({email, name, auth, tier}: createUserParams){
        //$  We need this factory because it's different when we're registering a user versus when we are rehydrating a user from the a UserRepository.
        const id = randomUUID()

        return new User(id, email, name, auth, tier, tier.baseCredits)

    }


    transferCredits(amount: number){
        if(this.credits < amount) {
            throw new Error('Not enough credits') //? Throw specific error instance
        }

        this.credits -= amount
    }

    receiveCredits(amount: number){

        console.log({
            selfCredits: this.credits,

            selfCreditsLimit: this.tier.creditLimit,

            amountToReceive: amount
        });

        

        if((this.credits + amount) > this.tier.creditLimit){
            throw new Error('Credit limit reached') //? Throw specific error instance
        }

        this.credits += amount
    }

    toObj(): UserPersistence{
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            auth: this.auth.toPersistence(),
            tierType: this.tier.type,
            credits: this.credits
        }
    }
}
