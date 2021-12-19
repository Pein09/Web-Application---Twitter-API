import { router } from "../server-init.js";
import { databaseOperationsAPI } from "./operations-api.js";


let connection;

if(!connection) 
databaseOperationsAPI
.connect()
.then((con) => {
    connection = con;
    console.log("Succesfully connected to the database!");
})
.catch((err) => console.error(err));


router
    .route("/check-status")
    .get(function sendStatusResponse(_, response){
response.status(200).json(`All good! System time: ${new Date()}`);

});

//a doua ruta va demonstra faptul ca conexiunea mea la baza s-a efectuat cu succes
router
    .route("/get-test-value")
    .get(async function getTestValue(_, response){
        const value = await databaseOperationsAPI.getTestValue(connection);
response.status(200).json(value);
});

//a treia ruta pt a vedea ce avem in tabela orders
//prima data e goala
//facem dupa metoda care insereaza in tabela orders
router
    .route("/orders")
    .get(async function getOrders(_, response){
        const orders = await databaseOperationsAPI.getOrders(connection);
response.status(200).json(orders);

});

//facem o selectie folosindu-ne de id dupa ce am inserat date in tabele

router
    .route("/orders/:orderId")
    .get(async function getOrderById(request, response){
        const orderId = +request.params.orderId;
        const order = await databaseOperationsAPI.getOrder(connection, orderId);
response.status(200).json(order);
});

//facem op de stergere

router
    .route("/orders/:orderId") 
    .delete(async function deleteOrder(request, response){
        const orderId = +request.params.orderId;
         await databaseOperationsAPI.deleteOrder(connection, orderId);
response.status(200).json("Succes");
});

//cream o ruta
router
    .route("/orders") 
    .post(async function createOrder({body: order}, response){
        //const order = request.body;
        //sau
        //const {body: order} = request; 
        await databaseOperationsAPI.createOrder(connection, order);
response.status(200).json("Succes");
});
