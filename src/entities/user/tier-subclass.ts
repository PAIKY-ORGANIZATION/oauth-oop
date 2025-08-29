
export interface TierType {
    readonly type: 'free' | 'premium'
    readonly baseCredits: number
    readonly creditLimit: number

    //! "toPersistence()" is actually now being used because Typescript can correctly infer all properties of the tier type from this interface. If properties that only exist on one type we would need this method.
    // toPersistence(): TierPersistence

}

export class FreeTier implements TierType {
    readonly type = 'free'
    readonly baseCredits = 100
    readonly creditLimit = 200

    // toPersistence(): TierPersistence {return {...this}}

}


export class PremiumTier implements TierType {
    readonly type = "premium"
    readonly baseCredits = 1000
    readonly creditLimit = 2000

    // toPersistence(): TierPersistence {return {...this}}

    cancelTier () {
        console.log("Subscription cancelled");
    }

} 
