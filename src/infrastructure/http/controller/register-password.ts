import { Request, Response } from 'express';

export const registerWithPasswordController = async(req: Request, res: Response)=>{
    
    const {password, email, name, oauthProvider}  = req.body



    // const user = new User(
    //     randomUUID(),
    //     email,
    //     name,

    // )


    res.send('OKK')

}