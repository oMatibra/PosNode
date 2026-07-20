import { Request, Response } from "express"

import UsuarioModel from "../models/userModel.js"

type BodyRegister = {
  "nome": string,
  "email": string,
  "senha": string,
  "telefone": string
}

export const registerController = async (request: Request, response: Response) => {
    
    try{

      const body:BodyRegister = request.body;

      const userExists = await UsuarioModel.findOne({ email: body.email });

      if(userExists){
        return response.status(400).json({message: "E-mail ja cadastrado"});
      }

      const user = await UsuarioModel.create(body);

      return response.json(user);

    }catch (error) {
      return response.status(500).json({ error })
    }
};