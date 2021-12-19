// pt a avea acces la un fisier din alt fisier trebuie importat fisierul respectiv
//facem acum

import "./sync.js";
import {router} from "../server-init.js";
import { sequelizeOperationsAPI } from "./operations-api.js";


router.route("/sequelize/pagina").get(async function getSequelizePagina(_ , response){

    const result = await sequelizeOperationsAPI.getPagina();
    response.status(200).json(result);
});

router.route("/sequelize/pagina")
.post(async function createPagina({body} , response){
    try{ 
    await sequelizeOperationsAPI.createPagina(body);
    response.status(200).json("Succes");
    }catch (err){
console.err(`Error while calling API: ${err}`);
    }
});

router.route("/sequelize/pagina/:paginaId").delete(async function deletePagina({params: {paginaId}}, response) {
   
    try{ 
        await sequelizeOperationsAPI.deletePagina(+paginaId);
        response.status(200).json("Succes");
        }catch (err){
    console.err(`Error while calling API: ${err}`);
        }
         
});

router.route("/sequelize/pagina/:paginaId").put(async function updatePagina({params: {paginaId}, body}, response) {
   
    try{ 
        await sequelizeOperationsAPI.updatePagina(+paginaId, body);
        response.status(200).json("Succes");
        }catch (err){
    console.err(`Error while calling API: ${err}`);
        }
         
});  

//daca vreau sa mi gaseasca tweet cu id 1, sa imi returneze si tweet si toate paginile care refera acel tweet
router.route("/sequelize/PaginaWithTweets/:tweetId").get(async function getPaginaWithTweetsBy({ params: {tweetId}}, response){ 
    const result = await sequelizeOperationsAPI.getPaginaWithTweetsBy( +tweetId);
    response.status(200).json(result);


});