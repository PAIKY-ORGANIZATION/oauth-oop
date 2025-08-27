export interface TierType {
    readonly name: 'free' | 'premium'
    readonly baseCredits: number
    readonly creditLimit: number


    // UNIQUE_TIER_BEHAVIOR_METHOD(): void //$ Why not put this in the `User` class? Because the behavior of this could depend on the type of tier. ONLY if we are sure that it won't change it can securely be put under `User`
    //% OPEN / CLOSED PRINCIPLE -> Open for extension: New tier behaviors can be added without modifying and affecting the User.
}

export class FreeTier implements TierType {
    readonly name = 'free'
    readonly baseCredits = 100
    readonly creditLimit = 200
}


export class PremiumTier implements TierType {
    readonly name = "premium"
    readonly baseCredits = 100
    readonly creditLimit = 200

    cancelTier () {
        console.log("Subscription cancelled");
    }

} 
