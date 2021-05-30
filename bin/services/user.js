"use strict";
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
var fs_1 = __importDefault(require("fs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_1 = __importDefault(require("../models/user"));
var config_1 = __importDefault(require("../config"));
var cache_external_1 = __importDefault(require("../utils/cache_external"));
var cache_local_1 = __importDefault(require("../utils/cache_local"));
var logger_1 = __importDefault(require("../utils/logger"));
var privateKey = fs_1.default.readFileSync(config_1.default.privateKeyFile);
var privateSecret = {
    key: privateKey,
    passphrase: config_1.default.privateKeyPassphrase
};
var signOptions = {
    algorithm: 'HS256',
    expiresIn: '14d'
};
var publicKey = fs_1.default.readFileSync(config_1.default.publicKeyFile);
var verifyOptions = {
    algorithms: ['HS256']
};
function auth(bearerToken) {
    return __awaiter(this, void 0, void 0, function () {
        var token, userId, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = bearerToken.split(' ')[1];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, cache_external_1.default.getProp(token)];
                case 2:
                    userId = _a.sent();
                    if (userId) {
                        return [2 /*return*/, { userId: userId }];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    logger_1.default.warn("login.cache.addToken: " + err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, new Promise(function (resolve, reject) {
                        jsonwebtoken_1.default.verify(token, privateKey, function (err, decoded) {
                            if (err === null && decoded !== undefined && decoded.userId !== undefined) {
                                var d_1 = decoded;
                                var expireAfter = d_1.exp - Math.round((new Date()).valueOf() / 1000);
                                console.log(d_1.exp + " " + Math.round((new Date()).valueOf() / 1000) + " " + expireAfter);
                                cache_external_1.default.setProp(token, d_1.userId, expireAfter)
                                    .then(function () {
                                    resolve({ userId: d_1.userId });
                                })
                                    .catch(function (err) {
                                    resolve({ userId: d_1.userId });
                                    logger_1.default.warn("auth.cache.addToken: " + err);
                                });
                            }
                            else {
                                resolve({ error: { type: 'unauthorized', message: 'Authentication Failed' } });
                            }
                        });
                    })];
            }
        });
    });
}
function createAuthToken(userId) {
    console.log(userId);
    return new Promise(function (resolve, reject) {
        jsonwebtoken_1.default.sign({ userId: userId }, privateKey, function (err, encoded) {
            if (err === null && encoded !== undefined) {
                var expireAfter = 2 * 604800; /* two weeks */
                var expireAt_1 = new Date();
                expireAt_1.setSeconds(expireAt_1.getSeconds() + expireAfter);
                cache_external_1.default.setProp(encoded, userId, expireAfter)
                    .then(function () {
                    resolve({ token: encoded, expireAt: expireAt_1 });
                }).catch(function (err) {
                    logger_1.default.warn("createAuthToken.setProp: " + err);
                    resolve({ token: encoded, expireAt: expireAt_1 });
                });
            }
            else {
                reject(err);
            }
        });
    });
}
function login(login, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user, passwordMatch, authToken, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    user = cache_local_1.default.get(login);
                    if (!!user) return [3 /*break*/, 2];
                    return [4 /*yield*/, user_1.default.findOne({ email: login })];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, { error: { type: 'invalid_credentials', message: 'Invalid Login/Password' } }];
                    }
                    cache_local_1.default.set(user._id.toString(), user);
                    cache_local_1.default.set(login, user);
                    _a.label = 2;
                case 2: return [4 /*yield*/, user.comparePassword(password)];
                case 3:
                    passwordMatch = _a.sent();
                    if (!passwordMatch) {
                        return [2 /*return*/, { error: { type: 'invalid_credentials', message: 'Invalid Login/Password' } }];
                    }
                    return [4 /*yield*/, createAuthToken(user._id.toString())];
                case 4:
                    authToken = _a.sent();
                    return [2 /*return*/, { userId: user._id.toString(), token: authToken.token, expireAt: authToken.expireAt, username: user.username }];
                case 5:
                    err_2 = _a.sent();
                    logger_1.default.error("login: " + err_2);
                    return [2 /*return*/, Promise.reject({ error: { type: 'internal_server_error', message: 'Internal Server Error' } })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function createUser(username, email, password, name) {
    return new Promise(function (resolve, reject) {
        var user = new user_1.default({ username: username, email: email, password: password, name: name });
        user.save()
            .then(function (u) {
            resolve({ userId: u._id.toString() });
        })
            .catch(function (err) {
            if (err.code === 11000) {
                resolve({ error: { type: 'account_already_exists', message: email + " already exists" } });
            }
            else {
                logger_1.default.error("createUser: " + err);
                reject(err);
            }
        });
    });
}
var profile = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                user = cache_local_1.default.get(userId);
                if (!!user) return [3 /*break*/, 2];
                return [4 /*yield*/, user_1.default.findById(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, { error: { type: 'invalid_credentials', message: 'Invalid Login/Password' } }];
                }
                _a.label = 2;
            case 2: return [2 /*return*/, {
                    userId: user._id.toString(),
                    name: user.name,
                    username: user.username,
                    email: user.email
                }];
            case 3:
                err_3 = _a.sent();
                logger_1.default.error("login: " + err_3);
                return [2 /*return*/, Promise.reject({ error: { type: 'internal_server_error', message: 'Internal Server Error' } })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    auth: auth,
    createAuthToken: createAuthToken,
    login: login,
    createUser: createUser,
    profile: profile
};
