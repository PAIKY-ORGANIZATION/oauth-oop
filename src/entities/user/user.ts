import { UserPersistence } from "../../application/interfaces/persisted-user.js"
import { AuthType } from "./auth-subclass.js"
import { TierType } from "./tier-subclass.js"



export class User {
    
    private credits: number
    
    constructor(
        public readonly id: string,
        private readonly email: string,
        private name: string,
        private readonly auth: AuthType,
        private tier: TierType
    ){
        this.credits = tier.baseCredits
    }

    // transferFile(){
    //     if(this.credits > 0)

    //     this.credits - 10 //! Can get negative.
    // }

    // tryCancelTier(){
    //     if("cancelTier" in this.tier){ //$ Only if the tier supports cancellation
    //         (this.tier as PremiumTier).cancelTier()
    //     }
        
    //     else {  throw new Error("Tier does not support cancellation")}
    // }

    transferCredits(amount: number){
        if(this.credits < amount) {
            throw new Error('Not enough credits') //? Throw specific error instance
        }

        this.credits -= amount
    }

    receiveCredits(amount: number){
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
