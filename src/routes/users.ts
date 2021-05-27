import {Express} from "express";
import endpoints from "../config/endpoints";
import {createUser, login, profile} from "../controllers/user";
import {auth} from "../middleware/auth";

const UserRoutes = (app: Express) => {
    app.route(endpoints.user.login).post(login);
    app.route(endpoints.user.signup).post(createUser);
    app.route(endpoints.user.profile).get(auth, profile);
}

export default UserRoutes