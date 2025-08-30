import { UserPersistence } from "../../application/interfaces/persisted-user.js"
import { LocalAuth, Oauth } from "../../entities/user/auth-subclass.js"
import { FreeTier, PremiumTier } from "../../entities/user/tier-subclass.js"
import { User } from "../../entities/user/user.js"



//$ Will be reused across UserRepository's
export const rehydrate = (user: UserPersistence): User=> {
    
    const auth = user.auth.type === 'local' ?
        new LocalAuth(user.auth.password) :
        new Oauth(user.auth.providerId, user.auth.oauthProvider)

    const tier = user.tierType === 'free'? new FreeTier() : new PremiumTier()
    return new User(user.id, user.email, user.name, auth, tier, user.credits)
}