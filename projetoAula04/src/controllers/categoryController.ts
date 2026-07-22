import { Request, Response } from "express";

import categoryModel from "../models/categoryModel.js";

type categoryBody = {
    nome: string;
};

export const categoryControllerPost = async(request:Request, response:Response)=>{

    const body:categoryBody = request.body;

    try {
      const category = await categoryModel.create(body);
      
      return response.status(201).json(category);
    } catch (error) {
      return response.status(500).json(error);
    }

};

export const categoryControllerGetAll = async(request:Request, response:Response)=>{

    const body:categoryBody = request.body;

    try {
      const category = await categoryModel.find();
      
      return response.status(200).json(category);
    } catch (error) {
      return response.status(500).json(error);
    }

};

export const categoryControllerPut = async(request:Request, response:Response)=>{

    const body:categoryBody = request.body;
    const idCategory = request.params.id;

    try {
      const category = await categoryModel.findById(idCategory);

      if(!category){
        return response.status(404).json("Categoria não existe");
      }

      await categoryModel.findByIdAndUpdate(idCategory,body);

      return response.status(204).json();
    } catch (error) {
      return response.status(500).json(error);
    }

};

export const categoryControllerDelete = async(request:Request, response:Response)=>{

    const idCategory = request.params.id;

    try {
      const category = await categoryModel.findById(idCategory);

      if(!category){
        return response.status(404).json("Categoria não existe");
      }

      await categoryModel.findByIdAndDelete(idCategory);

      return response.status(204).json();
    } catch (error) {
      return response.status(500).json(error);
    }

};
