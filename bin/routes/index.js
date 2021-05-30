"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = __importDefault(require("./users"));
var endpoints_1 = __importDefault(require("../config/endpoints"));
var Routes = function (app) {
    app.route(endpoints_1.default.test)
        .get(function (req, res) {
        res.status(200).send("Hello World");
    });
    app.route(endpoints_1.default.test)
        .get(function (req, res) {
        res.status(200).send("Hello World");
    });
    users_1.default(app);
};
exports.default = Routes;
