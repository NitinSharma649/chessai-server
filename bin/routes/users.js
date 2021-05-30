"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var endpoints_1 = __importDefault(require("../config/endpoints"));
var user_1 = require("../controllers/user");
var auth_1 = require("../middleware/auth");
var UserRoutes = function (app) {
    app.route(endpoints_1.default.user.login).post(user_1.login);
    app.route(endpoints_1.default.user.signup).post(user_1.createUser);
    app.route(endpoints_1.default.user.profile).get(auth_1.auth, user_1.profile);
};
exports.default = UserRoutes;
