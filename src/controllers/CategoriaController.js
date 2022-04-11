const knex = require("../database");

module.exports = {
    async index(req,res){
        const results = await knex("categorias");
        return res.json(results); // com o await acima ele esporeou a busca concluir pra só depois executar
    },                                // esta linha e retornar o resultado em forma de json
    async create(req,res,next){
        const {CategoriaNome} = req.body;
        // com a desestruturação de objeto acima, vai ser pego só a prop CategoriaNome de req.body
        // se vier outras props em req.body serão desconsideradas e não irá gerar erro.
        try{
            await knex("categorias").insert({CategoriaNome});// tem que passar um objero{} como arqumento do insert
            return res.status(201).send("tudo certo");
        }catch(erro){
            next(erro);
        }
       // await knex("categorias").insert(req.body);
       // Do jeito acima , vai dar erro de sql se o req.body não vor um objeto compatível com a 
       // tabela categoria
       
       /*
        const {CategoriaNome} = req.body;
        // Acima, ao associar o retorno de req ao objeto CategoriaNome, ira gerar um erro caso 
        // o request não mande o json e ai posso tratar este erro antes de mandar pro insert abaixo

        await knex("categorias").insert({CategoriaNome});

        console.log(req.body);
        */
         
   
   
    },

    async update(req,res,next){
        const {CategoriaNome} = req.body;
        const {CategoriaId} = req.params;

        try{
            //await knex("categorias").update({CategoriaNome}); /// ** Cuidado *** se eu passar sem o id vai 
                                                              // atualizar todos
                                                              // *** Update sem where ****
            await knex("categorias").update({CategoriaNome})  
            .where({CategoriaId})   // equivale a {CategoriaId:CategoriaId}                                                         
            //return res.status(201).send("tudo certo update");
            return res.send(); // o status é opcional( se não por nada o default é 200)
                                // mas o response.send() é obrigatório
                                // se não a api fica rodando pra sempre
          //  return res;  // Só o res sem o send também não funciona e fica rodando pra sempre

        }catch(erro){
            next(erro);
        }
    },
    async delete(req,res,next){
        const {CategoriaId} = req.params;
        
        try{
            await knex("categorias").where({CategoriaId})  
            .del()  ;  // *** Repare que, diferente do update, o del() vem por último ( depois do where)
            return res.send(); 
        }catch(erro){
            next(erro);
        }
    }
}

/* como estava antes no routes.js:
routes.get("/categorias",(req,res)=>{
    knex("categorias")
    .then((results)=>res.json(results));
});
*/