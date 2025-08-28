import { AuthType } from "./auth-suclass"
import { PremiumTier, TierType } from "./tier-subclass"



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

    transferFile(){
        if(this.credits > 0)

        this.credits - 10 //! Can get negative.
    }

    tryCancelTier(){
        if("cancelTier" in this.tier){ //$ Only if the tier supports cancellation
            (this.tier as PremiumTier).cancelTier()
        }

        else {  throw new Error("Tier does not support cancellation")}
    }

}
