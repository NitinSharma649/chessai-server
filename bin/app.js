"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cache_external_1 = __importDefault(require("./utils/cache_external"));
var db_1 = __importDefault(require("./utils/db"));
var logger_1 = __importDefault(require("./utils/logger"));
var server_1 = require("./utils/server");
var socketio_1 = require("./utils/socketio");
var config_1 = __importDefault(require("./config"));
cache_external_1.default.open()
    .then(function () { return db_1.default.open(); })
    .then(function () { return server_1.createServer(); })
    .then(function (app) { return socketio_1.createSocketServer(app); })
    .then(function (app) {
    app.listen(config_1.default.PORT || 3000, function () {
        logger_1.default.info("Listening on http://localhost:" + config_1.default.PORT);
    });
})
    .catch(function (err) {
    logger_1.default.error("Error: " + err);
});
