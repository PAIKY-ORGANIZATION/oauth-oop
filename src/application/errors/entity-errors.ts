import {  BadRequest } from "./base-errors.js";


//- Use cases can know about specific errors of entities as long as the errors are tied to business rules in your application (example: NOT ENOUGH CREDITS)

export class NotEnoughCreditsError {} 

export class TransactionError{}

export class CreditLimitReached extends BadRequest{
    constructor(){
        super('Credit limit reached')
    }
}