import { UserRepository } from "../../infrastructure/db/repositories/user-repository-interface.js";
import { BadRequest } from "../errors/base-errors.js";
import { CreditLimitReachedError, NotEnoughCreditsError } from "../errors/entity-errors.js";

export class TransferCreditsUseCase{

    constructor(private repository: UserRepository){}


    async execute(creditsAmount: number, senderUserId: string, receiverUserId: string){
        try{
            const [sender,  receiver] = await Promise.all([
                this.repository.findById(senderUserId),
                this.repository.findById(receiverUserId)
            ])
            
            if(!sender) throw new BadRequest('Sender not found')
            if(!receiver) throw new BadRequest('Receiver not found')
            
            
            sender.transferCredits(creditsAmount)
            receiver.receiveCredits(creditsAmount)
            
            //* Committing to database
            await this.repository.runAsTransaction(async ()=>{
                    
                //$ If one of these fails, the transaction will be "rolled back"/"reverted"
                await this.repository.saveToPersistence(sender, false),
                await this.repository.saveToPersistence(receiver, false)
            })
            
        }catch(e){
            if(e instanceof NotEnoughCreditsError){throw new BadRequest("You don't have enough credits")}	
            else if(e instanceof CreditLimitReachedError){throw new BadRequest("The receiver has reached it's credit limit")}	
            else {throw e} //- Just letting the internal error propagate
        }
        
    }
}