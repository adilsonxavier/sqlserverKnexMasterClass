
const express = require("express");
//const res = require("express/lib/response");
const app = express();

const routes = require("./routes")


app.use(routes);


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