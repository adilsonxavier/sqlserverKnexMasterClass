//const knex = require("../src/database/index"); // com é /index é opcional
const express = require("express");
const routes = express.Router();
const CategoriaController= require("./controllers/CategoriaController");
const ProdutosProvController = require("./controllers/ProdutosProvController");

routes.get("/categorias",CategoriaController.index);
routes.post("/categorias",CategoriaController.create);
routes.put("/categorias/:CategoriaId",CategoriaController.update);
routes.delete("/categorias/:CategoriaId",CategoriaController.delete);
//Se chamasse com "CategoriaController.index" sem parenteses daria o erro "Route.get() requires a 
//callback function but got a [object Promise]""



// O método acima retorna todos os itens da tabela categoria
// O método abaixo faz a mesma coisa

/*
app.get("/categorias",(req,res)=>
{
    knex.select("*").from("categorias")
    //.where("categoriaid",3)
    .then(cats=> cats)
    .then((results)=>res.json(results))
    .catch(erro=>console.log(erro))
    .finally(()=>{
        knex.destroy();}
    )
});
  */  

//routes.get("/produtosprov",ProdutosProvController.index);
routes.get("/produtosprov/:ProdutoProvId?",ProdutosProvController.index); // param opcional

routes.post("/produtosprov",ProdutosProvController.create);
routes.put("/produtosprov/:ProdutoProvId",ProdutosProvController.update);
routes.delete("/produtosprov/:ProdutoProvId",ProdutosProvController.delete);

module.exports = routes;