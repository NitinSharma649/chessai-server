"use strict";
/* istanbul ignore file */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongodb_memory_server_1 = require("mongodb-memory-server");
var config_1 = __importDefault(require("../config"));
var logger_1 = __importDefault(require("./logger"));
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.set('debug', process.env.DEBUG !== undefined);
var opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: config_1.default.mongo.useCreateIndex,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    autoIndex: config_1.default.mongo.autoIndex,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
};
var MongoConnection = /** @class */ (function () {
    function MongoConnection() {
    }
    MongoConnection.getInstance = function () {
        if (!MongoConnection._instance) {
            MongoConnection._instance = new MongoConnection();
        }
        return MongoConnection._instance;
    };
    MongoConnection.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mongoUrl, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(config_1.default.mongo.url === 'inmemory')) return [3 /*break*/, 3];
                        logger_1.default.debug('connecting to inmemory mongo db');
                        this._mongoServer = new mongodb_memory_server_1.MongoMemoryServer();
                        return [4 /*yield*/, this._mongoServer.getConnectionString()];
                    case 1:
                        mongoUrl = _a.sent();
                        return [4 /*yield*/, mongoose_1.default.connect(mongoUrl, opts)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        logger_1.default.debug('connecting to mongo db: ' + config_1.default.mongo.url);
                        mongoose_1.default.connect(config_1.default.mongo.url, opts);
                        _a.label = 4;
                    case 4:
                        mongoose_1.default.connection.on('connected', function () {
                            logger_1.default.info('Mongo: connected');
                        });
                        mongoose_1.default.connection.on('disconnected', function () {
                            logger_1.default.error('Mongo: disconnected');
                        });
                        mongoose_1.default.connection.on('error', function (err) {
                            logger_1.default.error("Mongo:  " + String(err));
                            if (err.name === "MongoNetworkError") {
                                setTimeout(function () {
                                    mongoose_1.default.connect(config_1.default.mongo.url, opts).catch(function () { });
                                }, 5000);
                            }
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        logger_1.default.error("db.open: " + err_1);
                        throw err_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MongoConnection.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, mongoose_1.default.disconnect()];
                    case 1:
                        _a.sent();
                        if (!(config_1.default.mongo.url === 'inmemory')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._mongoServer.stop()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        logger_1.default.error("db.open: " + err_2);
                        throw err_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return MongoConnection;
}());
exports.default = MongoConnection.getInstance();
