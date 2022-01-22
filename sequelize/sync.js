import { Sequelize } from "sequelize";
import { sequelizeConfigProps } from "../config.js";
import { sequelizeOperationsAPI } from "./operations-api.js";

//facem un seq connection

const sequelizeConnection = new Sequelize(
    "elrond",
    "root",
    "akatsu123",
    sequelizeConfigProps
    );


    export const Pagina = sequelizeConnection.define("Pagina", {
        PaginaId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        Title:{
            type: Sequelize.STRING,
        },
        Followers:{
            type: Sequelize.DECIMAL(18,2),
        },
        Description:{
            type: Sequelize.STRING,
        },
        City:{
            type: Sequelize.STRING,
        },
    }); 


    export const Tweets = sequelizeConnection.define("Tweets", {
        TweetId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        Text: {
            type:Sequelize.STRING,
        },
        Reshare: {
            type: Sequelize.DECIMAL(18,2),
        },
    });

    //14. one to many intre produse si comenzi
Pagina.hasMany(Tweets, {
    foreignKey: "PaginaId",
    onDelete: "CASCADE",
    foreignKeyConstraint: true,
});

/* ENTITIES */  

    sequelizeOperationsAPI.init(sequelizeConnection);
    export {sequelizeConnection};