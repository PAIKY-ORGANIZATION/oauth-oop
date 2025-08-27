export interface AuthType {
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

