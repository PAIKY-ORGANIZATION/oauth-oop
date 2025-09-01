import { Handler, NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod/v3";
import { AppError, InternalException } from "../../../application/errors/base-errors.js";




export const validator = (controller: Handler, validator?: AnyZodObject)=>{
    return async(req: Request, res: Response, next: NextFunction) => {
        try{

            if(validator){
                validator.parse(req)
            }

            await controller(req, res, next) //¡ Careful with this next() function


        }catch(e){
            let exception
            console.log('Caught Error: ', e);
            if(e instanceof AppError){
                exception = e;
            }else {
                exception = new InternalException('Internal Exception', e)
            }
            next(exception)
        }
    }

}