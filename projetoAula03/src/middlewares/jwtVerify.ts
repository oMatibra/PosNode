import{ Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";

export const jwtVerify = (request:Request, response:Response, next:NextFunction) => {
    const token = request.headers?.authorization || "";

    if(!token){
        return response.status(401).json({ message: "Usuario não autorizado" });
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY || "");
        console.log(decoded);

        next();
    } catch (error) {
        return response.status(401).json({ message: "Usuario não autorizado" });
    }
     
};