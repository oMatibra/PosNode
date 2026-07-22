import {Schema, model} from "mongoose";

const categorySchema = new Schema({
    nome: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true }
);

export default model("Categoria", categorySchema);