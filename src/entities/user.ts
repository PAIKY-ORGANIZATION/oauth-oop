import { inherits } from "util"

class User {

    //$ Keeping as many properties private for encapsulation
    constructor(
        private readonly id: string,
        // private readonly password: string | null, //? Maybe use iheritance for oauth user and regular user
        private readonly email: string, 
    ){}


    public toDTO (){
        return {
            //! WITHOUT PASSWORD    

        }
    }


    public toPersistence (){
        
    }

    public changePassword () {
        //? HASH PASSWORD
    }

}

export class OatuhUser extends User {
    constructor(
        id: string,
        email: string,
        private readonly oauthProvider: string,
        private readonly oauthId: string
    ){
        super(id, email)
    }

}


export class LocalUser extends User {
    constructor(
        id: string,
        email: string,
        public passwordHash: string        
    ){
        super(id, email)
    }
}