import express from 'express';
import mongoose from 'mongoose';

import timeModel from './Models/timeModels.js';
import produtoModel from './Models/produtoModel.js';

const app = express();
app.use(express.json.apply());

mongoose.connect('mongodb://admin:admin@ac-gppbszq-shard-00-00.mbh6euy.mongodb.net:27017,ac-gppbszq-shard-00-01.mbh6euy.mongodb.net:27017,ac-gppbszq-shard-00-02.mbh6euy.mongodb.net:27017/?ssl=true&replicaSet=atlas-ej0llv-shard-0&authSource=admin&appName=Cluster0')

app.get('/ping', (req, res) => {
    return response.json({ message: "Pong"});
});

app.post('/times', async (request, response) => {
  try {
    const body = request.body;

    await timeModel.create({nome:body.nome, urlImagem:body.urlImagem});

    return response.status(201).json({ message: "ok"});
  }catch (error) {
    return response.status(500).json({ message: "Erro ao cadastrar documento: " + error });
  }
})

app.get('/times', async (request, response) => {
  try {
    const times = await timeModel.find();

    return response.json(times);

  } catch (error) {
    return response.status(500).json({ message: "Erro ao buscar documentos: " + error });
  }
});

app.get('/times/:id', async (request, response) => {
  const id = request.params.id;

  try {
    const time = await timeModel.findById(id);

    if(!time) {
        return response.status(404).json({ message: "Time não encontrado"});
    }

    return response.json(time);
  
  } catch (error) {
    return response.status(500).json({ message: "Erro ao buscar time: " + error });
  }
});

app.put('/times/:id', async (request, response) => {
  try {
    const body = request.body;
    const id = request.params.id;

    const time = await timeModel.findOneAndUpdate({_id:id},{nome:body.nome, urlImagem:body.urlImagem});
    
    if(!time) {
        return response.status(404).json({ message: "Time não existe"});
    }

    return response.status(200).json({ message: "Time atualizado com sucesso"});

  } catch (error) {
    return response.status(500).json({ message: "Erro ao atualizar time: " + error });
  }
}); 

app.delete('/times/:id', async (request, response) => {
  try {
    const id = request.params.id;

    const time = await timeModel.findOneAndDelete({_id:id});
    
    if(!time) {
        return response.status(404).json({ message: "Time não existe"});
    }

    return response.status(200).json({ message: "Time removido com sucesso"});

  } catch (error) {
    return response.status(500).json({ message: "Erro ao remover time: " + error });
  }
});

app.post('/produtos', async (request, response) => {
  const body = request.body;
  
  try { 

    await produtoModel.create(body);

    return response.status(201).json({ message: "Ok" });

  } catch (error){
    return response.status(500).json({ message: "Erro ao adicionar produto do time: " + error });
  }
});

app.get('/produtos', async (request, response) => {
  try { 
    const times = await produtoModel.find();

    return response.status(201).json(times);

  } catch (error){
    return response.status(500).json({ message: "Erro ao buscar produto do time: " + error });
  }
});

app.get('/produtos-time/:id', async (request, response) => {
   const idTime = request.params.id;

  try { 
    const times = await produtoModel.find({ time: idTime });

    return response.json(times);

  } catch (error){
    return response.status(500).json({ message: "Erro ao buscar produto do time específico: " + error });
  }
});

app.put("/produtos/:id", async (request, response) =>{
  try {
    const id = request.params.id;
    const body = request.body;

    const produto = await produtoModel.findByIdAndUpdate({ _id: id }, body);

    if(!produto){
      return response.status(404).json({ message: "Produto não existe" });
    }

    return response.json({ message: "ok" });

  } catch {
    return response.status(500).json({ message: "Erro ao editar produto: " + error });
  }
});

app.delete('/produtos/:id', async (request, response) => {
  try {
    const id = request.params.id;

    const produto = await produtoModel.findOneAndDelete({ _id: id });
    
    if(!produto) {
        return response.status(404).json({ message: "Produto não existe"});
    }

    return response.status(200).json({ message: "Produto removido com sucesso"});

  } catch (error) {
    return response.status(500).json({ message: "Erro ao remover produto: " + error });
  }
});

app.listen(3333, () => console.log('Server is running on port 3333'));
