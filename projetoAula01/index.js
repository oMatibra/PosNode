import express from "express";

const app = express();
app.use(express.json());

let pessoas = [
    {
     id: 123019823,
     name: "Wesley Silva",
     idade: 33,
    },
    {
     id: 123019824,
     name: "Carla Moreira",
     idade: 29,
    },
    {
     id: 123019825,
     name: "Ana Barbosa",
     idade: 27,
    },
];

app.get("/pessoas", (request, response)=> {
    return response.status(200).json({pessoas: pessoas});
});

app.get("/pessoas/:id", (request, response)=> {
    
    const user = pessoas.find(
        (pessoa)=> String(pessoa.id) === String(request.params.id)
    );

    if (!user) {
        return response.status(404).json({message: "Pessoa não encontrada"});
    }

    return response.status(200).json({ user });
});

app.post("/pessoas", (request, response)=> {
    const { name, idade } = request.body;

    pessoas.push({ name, idade, id: Date.now()})

    return response.status(201).json({message: "Pessoa cadastrada com sucesso"});
});

app.put("/pessoas/:id", (request, response)=> {
    console.log(request.params);
    
    const userIndex = pessoas.findIndex(
        (pessoa)=> String(pessoa.id) === String(request.params.id));

    if (userIndex === -1) {
        return response.status(404).json({message: "Pessoa não encontrada"});
    }

    pessoas[userIndex].name = request.body.name;
    pessoas[userIndex].idade = request.body.idade;
        
    return response.status(200).json({message: "Pessoa atualizada com sucesso"});
})

app.delete("/pessoas/:id", (request, response)=> {
    //console.log(request.params);

    const pessoasFiltrado = pessoas.filter((pessoa)=> String(pessoa.id) !== String(request.params.id));

    pessoas = pessoasFiltrado;
    return response.json({ pessoasFiltrado });
});

app.listen(3333, ()=>console.log("Projeto executado com sucesso"));