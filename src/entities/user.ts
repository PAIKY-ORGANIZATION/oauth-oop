interface AuthType {
    readonly type: 'oauth' | 'local'
}

export class Oauth implements AuthType {
    readonly type =  'oauth'

    constructor(
        public readonly providerId: string,
        public readonly oauthProvider: string) {
    }
}

export class LocalAuth implements AuthType {
    readonly type = 'local'

    constructor(private password: string){}

    public getPassword() {
        return this.password
    }

    public verifyPassword (password: string) {
        return this.password === password
    }
}


interface TierType {
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


class PremiumTier implements TierType {
    readonly name = "premium"
    readonly baseCredits = 100
    readonly creditLimit = 200

    cancelTier () {
        console.log("Subscription cancelled");
    }

} 


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

        else {
            throw new Error("Tier does not support cancellation")
        }
    }

}
