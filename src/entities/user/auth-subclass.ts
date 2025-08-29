import { AuthPersistence, LocalAuthPersistence, OauthPersistence } from "../../application/interfaces/persisted-user.js"

export interface AuthType {
    readonly type: 'oauth' | 'local'

    toPersistence(): AuthPersistence

}

export class Oauth implements AuthType {
    readonly type =  'oauth'


    
    constructor(
        readonly providerId: string, 
        readonly oauthProvider: string
    ){}
    
    toPersistence(): OauthPersistence {
        return {...this} 
    }
}

export class LocalAuth implements AuthType {
    readonly type = 'local'

    constructor(readonly password: string){}


    public toPersistence(): LocalAuthPersistence {
        return {...this} //! even though this password is protected we can't spread it ... oh my  TS...
    }
}

