const knex = require("../src/database/index"); // com é /index é opcional
const express = require("express");
const routes = express.Router();

routes.get("/categorias",(req,res)=>{
    knex("categorias")
    .then((results)=>res.json(results));
});

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

module.exports = routes;