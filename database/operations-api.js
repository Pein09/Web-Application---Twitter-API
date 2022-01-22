import mariadb from  "mariadb";
import { databaseConfigProps } from "../config.js";


const instance = mariadb.createPool(databaseConfigProps);

async function connectToDatabase(){
    try{
        let connection = await instance.getConnection();
            return connection;
    }
    catch(err){
        throw err;
    }
}

async function getTestValue(dbConnection) 
{
    try{
        const result = await dbConnection.query("Select 1 as val");
            return result;
    }
    catch(err){
        console.error(err);
    }
}

async function getOrders(dbConnection) 
{
    try{
        const orders = await dbConnection.query("Select * from Orders");
            return orders;
    }
    catch(err){
        console.error(err);
    }
}

async function getOrder(dbConnection, orderId) 
{
    try{
        const order = await dbConnection.query("Select * from Orders WHERE OrderId = ?", [orderId]);
            return order;
    }
    catch(err){
        console.error(err);
    }
}

async function deleteOrder(dbConnection, orderId) 
{
    try{
         await dbConnection.query("DELETE FROM Orders WHERE OrderId = ?", [orderId]);
           
    }
    catch(err){
        console.error(err);
    }
}

async function createOrder(dbConnection, order) 
{
try{
    const {title, message , quantity, city} = order;
         await dbConnection.query("INSERT INTO Orders (Title, Quantity, Message, City) VALUES (?, ?, ?, ?)", [title, quantity, message, city],
  
         function handleError(err){
           throw err;
         }
  );
        }
        catch(err){
            console.error(err);
        }
    }

export const databaseOperationsAPI = {
    connect: connectToDatabase,
    getTestValue: getTestValue,
    getOrders: getOrders,
    getOrder: getOrder,
    deleteOrder: deleteOrder,
    createOrder: createOrder,
};