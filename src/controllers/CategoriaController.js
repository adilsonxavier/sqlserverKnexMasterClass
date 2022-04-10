const knex = require("../database");

module.exports = {
    async index(req,res){
        const results = await knex("categorias");
        return res.json(results); // com o awai acima ele esporeou a busca concluir pra só depois executar
    }                             // esta linha e retornar o resultado em forma de json
}

/* como estava antes no routes.js:
routes.get("/categorias",(req,res)=>{
    knex("categorias")
    .then((results)=>res.json(results));
});
*/