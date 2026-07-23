import {Schema, model} from "mongoose";

const productSchema = new  Schema({
  nome: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  filename: {
    type: String,
    required: true,    
  },
  estoque: {
    type: Number,
    required: true,    
  },
  representante: {
    type: String,
    required: true,    
  },
  descricao: {
    type: String,
    required: true,    
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref:"Usuario",
    required: true,
  },
},
{ timestamps: true }
);


export default model("Produto", productSchema);