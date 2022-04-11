const knex = require("../database");

module.exports = {
    async index(req,res){
        ///* Neste exemplo estou usando o req.query ao invés de req.params para recuperar o
        // id via query string
        // com isso a rota routes.get("/produtosprov",ProdutosProvController.index); vai funcionar
        // com o sem a query string.

        //const {ProdutoProvId} = req.query;
        const {ProdutoProvId} = req.params; // para o req.params criei rota com param opcional
        const query = knex("produtosProv");
        if(ProdutoProvId){
            query.where("produtoProvId",ProdutoProvId)
            // equivalentes a linha de cima:
           // query.where({ProdutoProvId});
           // query.where({ProdutoProvId:ProdutoProvId});
         }
         query.join("Categorias","produtosProv.categoriaId","=","categorias.categoriaId")
         // join caterogias on produtosProv.categoriaId = categorias.categoriaId

         .select("produtosProv.*","categorias.categoriaNome");

         console.log(query.toString());

         const results = await query;
        //const results = await knex("produtosProv");
        return res.json(results); // com o await acima ele esporeou a busca concluir pra só depois executar
    },                                // esta linha e retornar o resultado em forma de json
    async create(req,res,next){
        const {ProdutoProvNome,CategoriaId} = req.body;
       
        try{
            await knex("produtosProv").insert({ProdutoProvNome,CategoriaId});// tem que passar um objero{} como arqumento do insert
            return res.status(201).send("produto prov criado");
        }catch(erro){
            next(erro);
        }
         
    },

    async update(req,res,next){
        const {ProdutoProvNome,CategoriaId} = req.body;
        const {ProdutoProvId} = req.params;

        try{
            //await knex("produtosProv").update({CategoriaNome}); /// ** Cuidado *** se eu passar sem o id vai 
                                                              // atualizar todos
                                                              // *** Update sem where ****
            await knex("produtosProv").update({ProdutoProvNome,CategoriaId})  
            .where({ProdutoProvId})   // equivale a {CategoriaId:CategoriaId}                                                         
            //return res.status(201).send("tudo certo update");
            return res.send("alterado"); // o status é opcional( se não por nada o default é 200)
                                // mas o response.send() é obrigatório
                                // se não a api fica rodando pra sempre
          //  return res;  // Só o res sem o send também não funciona e fica rodando pra sempre

        }catch(erro){
            next(erro);
        }
    },
    async delete(req,res,next){
        const {ProdutoProvId} = req.params;
        
        try{
            await knex("produtosProv").where({ProdutoProvId})  
            .del()  ;  // *** Repare que, diferente do update, o del() vem por último ( depois do where)
            return res.send(); 
        }catch(erro){
            next(erro);
        }
    }
}

/* como estava antes no routes.js:
routes.get("/produtosProv",(req,res)=>{
    knex("produtosProv")
    .then((results)=>res.json(results));
});
*/