import {Express} from "express";
import endpoints from "@chessAi/config/endpoints";
import {createUser, login, profile} from "@chessAi/controllers/user";
import {auth} from "@chessAi/middleware/auth";

const UserRoutes = (app: Express) => {
    app.route(endpoints.user.login).post(login);
    app.route(endpoints.user.signup).post(createUser);
    app.route(endpoints.user.profile).get(auth, profile);
}

export default UserRoutes