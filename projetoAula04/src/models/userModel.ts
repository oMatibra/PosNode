import {Schema, model} from "mongoose";

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    nome: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
    },
    telefone: {
        type: String,
        required: true,
    }
},
{
    timestamps: true,
}
);

export default model("Usuario", userSchema);