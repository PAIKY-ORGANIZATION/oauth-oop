import { Request, Response } from 'express';
import { transferCreditsUseCase } from '../../../index.js';

export const transferCreditsController = async(req: Request, res: Response)=>{
    
    //? Need to take teh selfUserId from the cookie session
    const {selfUserId, credits_amount} = req.body

    const receiverUserId = req.params.userId

    await transferCreditsUseCase.execute(credits_amount, selfUserId, receiverUserId)


    res.send('Ok')
}