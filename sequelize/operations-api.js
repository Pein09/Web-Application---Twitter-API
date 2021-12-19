
import {Pagina, Tweets} from "./sync.js";

//1. metoda de autentificare



/* INIT SEQ */
async function sequelizeAuth(sequelizeConnection){
    try{
            await sequelizeConnection.authenticate();
            console.log("Sequelize has succesfully connected to the database!");
    }
    catch(err){
        console.error(
            `There was an error connecting to the db using seq: ${err}`
            );
    }

}
//11. a treia metoda
async function sequelizeSync(sequelizeConnection){
    try{
        await sequelizeConnection.sync({force: true, alter: true});
        console.log("Sync completed!");
}
catch(err){
    console.error(
        `There was an error while syncing to the db using seq: ${err}`
        );
}
}


async function executeInitialDatabasePopulation(){
    try { 
     await Pagina.create({
         Title: "Title from code",
         Followers: 23,
         City: "City from code",
         Description: "Description from code",
     });  
     await Pagina.create({
         Title: "Title from code 2",
         Followers: 25,
         City: "City from code 2",
         Description: "Description from code 2",
     });  
     await Tweets.create({
         Text: "Text about elrond 1",
         Reshare: 100,
         PaginaId: 1,
     });
 } catch (err){
     console.error(`There was a problem populating the database: ${err}`);
 }
 }
//2. a doua metoda

async function sequelizeInit(sequelizeConnection){
    await sequelizeAuth(sequelizeConnection);
    await sequelizeSync(sequelizeConnection);
    await executeInitialDatabasePopulation();  
}



//15. metoda de getOrders

async function getPagina(){
    try{

        return await Pagina.findAll();

    }
    catch(err) {
        console.log(err);
    }
}


async function createPagina(pagina){
    try{

        await Pagina.create({
            Title: pagina.Title,
            Followers: pagina.Followers,
            City: pagina.City,
            Description: pagina.Description,
        });

    }
    catch(err) {
        throw err;
    }
}

async function deletePagina(PaginaId){
    try{

        const record = await Pagina.findByPk(PaginaId);
        if(record) await record.destroy();
    }
    catch(err) {
        throw err;
    }
}

async function updatePagina(PaginaId, pagina){
    try{

        const record = await Pagina.findByPk(PaginaId);
        if(record) 
        await record.update({
            Title: pagina.Title,
            Followers: pagina.Followers,
            City: pagina.City,
            Description: pagina.Description,
        });
    }
    catch(err) {
        throw err;
    }
}

async function getPaginaWithTweetsBy(tweetId){
    try{
        return await Pagina.findAll({
            include: [{
                 model: Tweets,
                 where: {TweetId: tweetId},
            }]
        })
    }
    catch(err){
        console.error(`Error while retrieving data: ${err}`)
    }
}


export const sequelizeOperationsAPI = {
    init: sequelizeInit,
    getPagina: getPagina,
    createPagina: createPagina,
    deletePagina: deletePagina,
    updatePagina:updatePagina,
    getPaginaWithTweetsBy: getPaginaWithTweetsBy,
};