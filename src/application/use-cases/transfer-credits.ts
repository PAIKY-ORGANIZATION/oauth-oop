import { UserRepository } from "../../infrastructure/db/repositories/user-repository-interface.js";

export class TransferCreditsUseCase{

    constructor(private repository: UserRepository){}


    async execute(creditsAmount: number, senderUserId: string, receiverUserId: string){
        
        

        //$ We run in a single transaction so that if one operation fails, the whole transaction REVERTS.
        await this.repository.runAsTransaction(async ()=>{
            
            //$ We run these inside of a transaction in relevant fields (credits) change.
            const [sender,  receiver] = await Promise.all([
                this.repository.findById(senderUserId),
                this.repository.findById(receiverUserId)
            ])

            if(!sender) throw new Error('Sender not found')
            if(!receiver) throw new Error('Receiver not found')
    
            //$ If one of these fails, the transaction will be "rolled back"/"reverted"
            sender.transferCredits(creditsAmount)
            receiver.receiveCredits(creditsAmount)
    
    
            //? This needs to support transactions

            await this.repository.saveToPersistence(sender, false),
            await this.repository.saveToPersistence(receiver, false)
        })
    }
}