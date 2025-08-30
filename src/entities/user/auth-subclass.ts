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

    constructor(private password: string){}


    changePassword(hash: string){
        this.password = hash
    }


    public toPersistence(): LocalAuthPersistence {
        return {...this, password: this.password} //! even though this password is protected we can't spread it ... oh my TS...
    }
}

