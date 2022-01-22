// pt a avea acces la un fisier din alt fisier trebuie importat fisierul respectiv
//facem acum

import "./sync.js";
import {router} from "../server-init.js";
import { sequelizeOperationsAPI } from "./operations-api.js";

import Twit from 'twit'  
//biblioteca js care ne lasa sa comunicam cu twitter
//npm install twit/node/open/franc/twitter
//import franc from 'franc';

//am solicitat acces la cont developer de la Twitter si mi-au dat aceste elemente pentru a ma putea conecta la api
const apikey = 'ONo6NnV9P53y0kb6rxi9P0Zn1'
const apiSecretKey = 'SThYqRvvj9BTdbAcASF16e2f14l1LaOnxAUbIAIC47ZASvBkLC'
const accessToken = '1472150608744529920-KnjyTk7tVn0Ri8gwHpPE24DEn6Kc1r'
const accessTokenSecret = '3yROs5aTb0G9ETfnPO2ZkuOX3M4rICUAuA2VRvz6coRha'

//construim un obiect Twit - realizeaza o conexiune la Twitter API
var T = new Twit({
    consumer_key: apikey,
    consumer_secret: apiSecretKey,
    access_token: accessToken,
    access_token_secret: accessTokenSecret,
});


router.route("/sequelize/pagina").get(async function getSequelizePagina(_ , response){

    const result = await sequelizeOperationsAPI.getPagina();
    response.status(200).json(result);
});

router.route("/sequelize/tweets").get(async function getSequelizeTweets(_ , response){

    const result = await sequelizeOperationsAPI.getTweet();
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


router.route("/tweets-from-api").get(async function getTweetesFromApi(_, response) {
    var params =  {
        q: 'elrond since:2020-12-01',
        count: 25 }
    var result ;
     await T.get('search/tweets', params).then((res)=>result = res);
      
      response.status(200).json(result);
})
