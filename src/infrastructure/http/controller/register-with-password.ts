import { Request, Response } from 'express';
import { registerWithPasswordUseCase } from '../../..';

export const registerWithPasswordController = async(req: Request, res: Response)=>{
    
    const {email, name, password}  = req.body


    const user = await registerWithPasswordUseCase.execute(email, password, name)

    res.send(user) //? Maybe not return the whole user like this?
    
}