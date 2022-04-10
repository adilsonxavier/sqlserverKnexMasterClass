const knex = require("../src/database/index"); // com é /index é opcional
const express = require("express");
const res = require("express/lib/response");
const app = express();

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
    
    


app.listen(3333,()=> console.log("porta 3333"));

/*

knex.select("*").from("categorias")
.where("categoriaid",3)
.then(cats=>{
    console.log(cats);
    cats.forEach(cat => {
        console.log(cat);
    });
})
.catch(erro=>console.log(erro))
.finally(()=>{
    knex.destroy();}
);
*/