import {Express, Request, Response} from "express";
import UserRoutes from "./users";
import endpoints from "../config/endpoints";

const Routes = (app: Express) => {
    app.route(endpoints.test)
        .get((req: Request, res: Response) =>{
            res.status(200).send("Hello World");
        });

    app.route(endpoints.test)
        .get((req: Request, res: Response) =>{
            res.status(200).send("Hello World");
        });

    UserRoutes(app);
}

export default Routes;