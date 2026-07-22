import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";

import { initializeApp } from "firebase/app";

import config from "./config/cloudinary.js";

import { authController, registerController } from "./controllers/authController.js";
import { categoryControllerDelete, categoryControllerGetAll, categoryControllerPost, categoryControllerPut } from "./controllers/categoryController.js";

import {jwtVerify} from "./middlewares/jwtVerify.js";
import { productControllerPost } from "./controllers/productController.js";

dotenv.config();

const app = express();
app.use(express.json());

initializeApp(config.cloudinaryConfig);

mongoose.connect(process.env.STRING_BANCO_DADOS ? process.env.STRING_BANCO_DADOS : "");

app.get("/ping", (request, response) => {
    return response.json({ message: "Pong"});
});

// USUARIOS
app.post("/registro", registerController);
app.post("/auth", authController);

//CATEGORIAS
app.post("/categorias", jwtVerify, categoryControllerPost);
app.get("/categorias", jwtVerify, categoryControllerGetAll);
app.put("/categorias/:id", jwtVerify, categoryControllerPut);
app.delete("/categorias/:id", jwtVerify, categoryControllerDelete);

//PRODUTOS
app.post("/produtos", jwtVerify, productControllerPost);

app.listen(3333, () => console.log("Servidor iniciado com sucesso"));