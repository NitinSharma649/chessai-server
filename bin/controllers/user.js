"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.createUser = exports.login = void 0;
var user_1 = __importDefault(require("../services/user"));
var response_1 = require("../utils/response");
var logger_1 = __importDefault(require("../utils/logger"));
function login(req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    user_1.default.login(email, password)
        .then(function (resp) {
        if (resp.error) {
            if (resp.error.type === 'invalid_credentials') {
                response_1.writeJsonResponse(res, 401, resp);
            }
            else {
                throw new Error("unsupported " + resp);
            }
        }
        else {
            var _a = resp, userId = _a.userId, token = _a.token, expireAt = _a.expireAt, username = _a.username;
            response_1.writeJsonResponse(res, 200, { userId: userId, token: token, username: username }, { 'X-Expires-After': expireAt.toISOString() });
        }
    })
        .catch(function (err) {
        logger_1.default.error("login: " + err);
        response_1.writeJsonResponse(res, 500, { error: { type: 'internal_server_error', message: 'Internal Server Error' } });
    });
}
exports.login = login;
function createUser(req, res) {
    var _a = req.body, username = _a.username, email = _a.email, password = _a.password, name = _a.name;
    user_1.default.createUser(username, email, password, name)
        .then(function (resp) {
        if (resp.error) {
            if (resp.error.type === 'account_already_exists') {
                response_1.writeJsonResponse(res, 409, resp);
            }
            else {
                throw new Error("unsupported " + resp);
            }
        }
        else {
            response_1.writeJsonResponse(res, 201, resp);
        }
    })
        .catch(function (err) {
        logger_1.default.error("createUser: " + err);
        response_1.writeJsonResponse(res, 500, { error: { type: 'internal_server_error', message: 'Internal Server Error' } });
    });
}
exports.createUser = createUser;
function profile(req, res, next) {
    user_1.default.profile(res.locals.auth.userId)
        .then(function (resp) {
        if (resp.error) {
            throw new Error("unsupported " + resp);
        }
        else {
            response_1.writeJsonResponse(res, 200, resp);
        }
    })
        .catch(function (err) {
        logger_1.default.error("login: " + err);
        response_1.writeJsonResponse(res, 500, { error: { type: 'internal_server_error', message: 'Internal Server Error' } });
    });
}
exports.profile = profile;
