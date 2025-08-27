import { AuthType } from "./auth"
import { PremiumTier, TierType } from "./tier"



export class User {

    constructor(
        public readonly id: string,
        private readonly email: string,
        private name: string,
        private credits: number,
        private readonly auth: AuthType,
        private tier: TierType
    ){}

    transferFile(){}

    tryCancelTier(){
        if("cancelTier" in this.tier){ //$ Only if the tier supports cancellation
            (this.tier as PremiumTier).cancelTier()
        }

        else {  throw new Error("Tier does not support cancellation")}
    }

}
