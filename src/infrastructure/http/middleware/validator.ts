import { Handler, NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod/v3";




export const validator = (controller: Handler, validator?: AnyZodObject)=>{

    
    return async(req: Request, res: Response, next: NextFunction) => {
        try{

            if(validator){
                validator.parse(req)
            }

            await controller(req, res, next) //¡ Careful with this next() function


        }catch(e){

            res.status(400).send(e.message)

            console.log(e);	
        }
    }

}