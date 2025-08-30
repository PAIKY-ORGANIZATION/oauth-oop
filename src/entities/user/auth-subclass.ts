import { AuthPersistence, LocalAuthPersistence, OauthPersistence } from "../../application/interfaces/persisted-user.js"

export interface AuthType {
    readonly type: 'oauth' | 'local'

    toObj(): AuthPersistence

}

export class Oauth implements AuthType {
    readonly type =  'oauth'
    
    constructor(
        readonly providerId: string, 
        readonly oauthProvider: string
    ){}
    
    toObj(): OauthPersistence {
        return {...this} 
    }
}

export class LocalAuth implements AuthType {
    readonly type = 'local'

    constructor(private password: string){}


    changePassword(hash: string){
        this.password = hash
    }


    public toObj(): LocalAuthPersistence {
        return {...this, password: this.password} //! even though this password is protected we can't spread it ... oh my TS...
    }
}

