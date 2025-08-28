import { AuthType, LocalAuth } from "./auth-subclass"
import { PremiumTier, TierType } from "./tier-subclass"



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
        if("getPassword" in this.auth){
            return (this.auth as LocalAuth).getPassword()
        }

        else {  throw new Error("This user not support passwords")}
    }



    //$ I prefer simplicity a lot.
    // getTierName(){
    //     return this.tier.name
    // }

    // getAuthType(){
    //     return this.auth.type
    // }

    // getName(){
    //     return this.name
    // } 

    // getEmail(){
    //     return this.email
    // }

}
