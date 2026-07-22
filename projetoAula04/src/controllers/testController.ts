import { Request, Response } from "express"

export const testController = (request: Request, response: Response) =>{
    return response.json({ message: "Tudo certo" });  
}