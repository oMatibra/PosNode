import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";

import { registerController } from "./controllers/authController.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.STRING_BANCO_DADOS ? process.env.STRING_BANCO_DADOS : "");

app.get("/ping", (request, response) => {
    return response.json({ message: "Pong"});
});

// USUARIOS

app.post("/registro", registerController)

app.listen(3333, () => console.log("Servidor iniciado com sucesso"));