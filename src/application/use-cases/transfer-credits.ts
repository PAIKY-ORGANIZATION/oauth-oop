import { UserRepository } from "../../infrastructure/db/userRepository.js";

export class TransferCreditsUseCase{

    constructor(private repository: UserRepository){}


    async execute(creditsAmount: number, senderUserId: string, receiverUserId: string){
        
        
        await this.repository.runAsTransaction(async ()=>{
            
            //$ We run these inside of a transaction in relevant fields (credits) change.
            const [sender,  receiver] = await Promise.all([
                this.repository.findById(senderUserId),
                this.repository.findById(receiverUserId)
            ])
    
    
            //$ If one of these fails, the transaction will be "rolled back"/"reverted"
            sender.transferCredits(creditsAmount)
            receiver.receiveCredits(creditsAmount)
    
    
            //? This needs to support transactions

            await this.repository.saveToPersistence(sender),
            await this.repository.saveToPersistence(receiver)
        })



    }

}