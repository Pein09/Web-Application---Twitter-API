export var databaseConfigProps = {

    port: 3306,
    host: "Localhost",
    user: "root",
    password: "akatsu123",
    database: "elrond",

};

export const sequelizeConfigProps = {

    host: "Localhost",
    dialect: "mariadb",
    dialectOptions: {
        options: {
            trustedConnection: true,
                },
    },


};
