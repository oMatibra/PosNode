import { Request, Response } from "express";
import productModel from "../models/productModel.js";
import jwt from "jsonwebtoken";

type BodyPost = {
    nome: string;
    preco: number;
    imagem: string;
    estoque: number;
    representante: string;
    descricao: string;
    category: string;
    usuario: string;
};

type DecodedType = {
    id: string;
};

export const productControllerPost = async(request:Request, response:Response)=>{

    const body: BodyPost = request.body;

    const token = request.headers.authorization;

    if(!token){
     return response.status(401).json({ message:"Usuario não tem permissão" });
    };

    try {

      const decoded = jwt.verify(token, process.env.SECRET_KEY || "") as DecodedType;

      body.usuario = decoded.id;

      const product = await productModel.create(body);
      
      return response.status(201).json(product);
    } catch (error) {
      return response.status(500).json(error);
    }
}
