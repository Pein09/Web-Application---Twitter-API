//fisierul care imi va initializa serverul

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Twit from "twit";
import Twitter from "twit";


if(process.env.NODE_ENV != 'production') dotenv.config();

const server = express();

//routerul
const router = express.Router();

server.use(express.urlencoded({extended: true}));
server.use(express.json());
server.use(cors());


//routerul va folosi o ruta standard
server.use("/api", router);

//definim un port care va prelua procesul
var port = process.env.PORT || 8000;
server.listen(port, function afterServerStart(){
    console.log(`Server is running on port ${port}`);
});

export {server, router};