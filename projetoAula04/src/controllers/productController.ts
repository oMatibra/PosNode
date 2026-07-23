import { Request, Response } from "express";
import productModel from "../models/productModel.js";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";
import { UploadApiResponse } from "cloudinary";

type BodyPost = {
    nome: string;
    preco: number;
    filename: string;
    estoque: number;
    representante: string;
    descricao: string;
    category: string;
    usuario: string;
};

type DecodedType = {
    id: string;
};

export const productControllerPost = async(request:Request, response:Response) => {

    const body: BodyPost = request.body;

    const token = request.headers.authorization;

    if(!token){
     return response.status(401).json({ message:"Usuario não tem permissão" });
    };

    try {

      if (!request.file){
          return response.status(400).json({message:"Imagem é obrigatória!"});
      };

      const file = request.file!;

      const upload = await new Promise<UploadApiResponse>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
              {
                folder: `files/${request.file?.originalname}${Date.now()}`,
              },
              (error, result) => {
                  if (error) return reject(error);

                  if (!result) {
                      return reject(new Error("Falha ao fazer upload."));
                  }

                  resolve(result);
              }
          );

          Readable.from(file.buffer).pipe(stream);
      });

      body.filename = upload.secure_url;

      const decoded = jwt.verify(token, process.env.SECRET_KEY || "") as DecodedType;

      body.usuario = decoded.id;

      const product = await productModel.create(body);
      
      return response.status(201).json(product);
    } catch (error) {
      return response.status(500).json(error);
    }
}
