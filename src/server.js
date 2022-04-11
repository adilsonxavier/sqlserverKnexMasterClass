
const express = require("express");
//const res = require("express/lib/response");
const app = express();

const routes = require("./routes")

// As linhas abaixo acrescentam os middlewares express.json() e express.Router() a pipeline
// do express.
// A ordem que as middlewares são acrescentadas pode importar. Por exemplo: se o routes()
// viesse antes do json() no exemplo abaixo , o json() não funcionaria.
// Este arquivo server.js é um bom local para incrementar a pipeline com o use() por que o
// serve.js é executado globalmente na app por ser o que é exechtado primeiro pelo "node .\src\server.js"
app.use(express.json());
app.use(routes);

// Catch All
// Vai no fim da pipeline para que peque os erros do que ocorrer antes dele
app.use((error,req,res,next)=>{   // Normalmente tem os params req,res,e next . Se houver 4 então p
                                  // primeiro é um objeto de erro que dispara automaticamente quando
                                  // ocorrer um erro
    res.status(error.status || 500) ; // o error.status pode ser 404 ( por exemplo)
    res.json({errorPego: error.message});
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