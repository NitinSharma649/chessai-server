import express from "express";
import bodyParser from "body-parser";
import { Routes } from "./routes";
import mongoose from "mongoose";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

class App {
    public app: express.Application;
    public routePrv: Routes = new Routes;

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        // this.moongoSetup();
    }
    
    private config(): void {
        this.app.use(function(req, res,next){
            res.header("Access-Control-Allow-Origin", "*")
            res.header("Access-Control-Allow-Headers", "Origin, X-Request-With");
            res.header("Access-Control-Allow-Method", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
            next();
        });

        // support application/json type post data
        this.app.use(bodyParser.json());

        // support applicaiton/x-www-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private moongoSetup():void {
        mongoose.connect('mongodb://test:test123@ds129098.mlab.com:29098/nodejs', {})
        .then(()=>console.log("connection successful"))
        .catch((err)=> console.error(err));
    }
}

export default new App().app;