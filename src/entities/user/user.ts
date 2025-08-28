import { AuthType, LocalAuth } from "./auth-subclass.js"
import { PremiumTier, TierType } from "./tier-subclass.js"



export class User {
    
    private credits: number
    
    constructor(
        public readonly id: string,
        public readonly email: string,
        public name: string,
        public readonly auth: AuthType,
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

    tryGetPassword(){
        if(this.auth instanceof LocalAuth){ //! Avoid this, what if later we want to add a "LegacyAuth" with "getPassword()".  We would violate  Open/closed since  we would need to  modify the "if" statement.
        // if("getPassword" in this.auth){
            this.auth.getPassword()
        }

        else {  throw new Error("This user not support passwords")}
    }



    //? TEST
    // toPlainObject(){
    //     return {
    //         id: this.id,
    //         email: this.email,
    //         name: this.name,
    //         auth: this.auth,
    //         tier: this.tier,
    //         credits: this.credits
    //     }
    // }

}
