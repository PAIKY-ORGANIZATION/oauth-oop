import { UserRepository } from "../../infrastructure/db/userRepository.js";

export class TransferCredits{

    constructor(private repository: UserRepository){}


    async execute(creditsAmount: number, senderUserId: string, receiverUserId: string){

        //$ If one promise fails the error will be the error of the first promise that threw
        const [sender,  receiver] = await Promise.all([
            this.repository.findById(senderUserId),
            this.repository.findById(receiverUserId)
        ])


        //$ If one of these fails, the transaction will be "rolled back"/"reverted"
        sender.transferCredits(creditsAmount)
        receiver.receiveCredits(creditsAmount)


        //? This needs to support transactions
        Promise.all([
            this.repository.saveToPersistence(sender),
            this.repository.saveToPersistence(receiver)
        ])

    }

}