"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var user_1 = __importDefault(require("../services/user"));
var response_1 = require("../utils/response");
var logger_1 = __importDefault(require("../utils/logger"));
function auth(req, res, next) {
    var token = req.headers.authorization;
    if (token) {
        user_1.default.auth(token)
            .then(function (authResponse) {
            if (!authResponse.error) {
                res.locals.auth = {
                    userId: authResponse.userId
                };
                next();
            }
            else {
                response_1.writeJsonResponse(res, 401, authResponse);
            }
        })
            .catch(function (err) {
            logger_1.default.error("auth: " + err);
            response_1.writeJsonResponse(res, 500, { error: { type: 'internal_server_error', message: 'Internal Server Error' } });
        });
    }
    else {
        response_1.writeJsonResponse(res, 401, { error: { type: 'authentication required', message: 'Authentication Required' } });
    }
}
exports.auth = auth;
