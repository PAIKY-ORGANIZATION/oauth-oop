import { randomUUID } from "crypto"


Interface


//* Why "Abstract"?
//$ If you will never instantiate User directly and it only exists as a base class for its children, then marking it as abstract is the correct design.

abstract class User {
    
    //* why "protected" and not private: 
    // $ "protected" makes properties accessible within the class and its subclasses. Need it for DTO and toPersistence on subclasses.

    //$ Keeping as many properties private for encapsulation
    constructor(
        private readonly id: string,
        protected readonly email: string, 
    ){
        // this.id = randomUUID() //! THIS WILL CAUSE A BUG WHEN REHYDRATING WITH AN EXISTING ID, assign id only when creating
    }

    create(){
        const id = randomUUID()
    }



    public toDTO (){
        //! WITHOUT PASSWORD    
    }


    public toPersistence (): any{}


}






// export class OauthUser extends User {
//     constructor(
//         email: string,
//         private readonly oauthProvider: string,
//         private readonly oauthId: string
//     ){
//         super(email)
//     }



//     public toPersistence() {
//         return {
//             id: this.id,
//             email: this.email,
//             oauth_provider: this.oauthProvider,
//             oauth_id: this.oauthId
//         }
//     }
// }


// export class LocalUser extends User {
//     constructor(
//         email: string,
//         public passwordHash: string        
//     ){
//         super(email)
//     }

//     changePassword() {
        
//     }

// }