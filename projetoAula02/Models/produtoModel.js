import {Schema, model} from 'mongoose';

const produtoSchema = new Schema({
    nome: { 
        type: String, 
        required: true, 
    },
    preco: { 
        type: Number, 
        required: true, 
    },
    precoPromocional: {
        type: Number, 
        required: false, 
    },
    fabricante: { 
        type: String, 
        required: true,
    },
    estoque: { 
        type: Number, 
        required: true,
        min: 0,
    },
    urlImagem: { 
        type: String, 
        required: true, 
    },
    descricao: {
        type: String,
        required: true,
    },
    time:{
        type: Schema.Types.ObjectId,
        ref: 'Time',
        required: true,
    },
});

export default model('Produto', produtoSchema);