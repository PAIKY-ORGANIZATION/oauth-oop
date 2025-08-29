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

            if(!sender) throw new Error('Sender not found')
            if(!receiver) throw new Error('Receiver not found')
    

            console.log({
                senderId: sender.toObj().id,
                receiverId: receiver.toObj().id
            });
            
            console.log({sender, receiver});
            
    
            //$ If one of these fails, the transaction will be "rolled back"/"reverted"
            sender.transferCredits(creditsAmount)
            receiver.receiveCredits(creditsAmount)
    
    
            //? This needs to support transactions

            await this.repository.saveToPersistence(sender),
            await this.repository.saveToPersistence(receiver)
        })



    }

}