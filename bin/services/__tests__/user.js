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
var faker_1 = __importDefault(require("faker"));
var cache_external_1 = __importDefault(require("../../utils/cache_external"));
var db_1 = __importDefault(require("../../utils/db"));
var user_1 = require("../../tests/user");
var user_2 = __importDefault(require("../user"));
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, cache_external_1.default.open()];
            case 1:
                _a.sent();
                return [4 /*yield*/, db_1.default.open()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, cache_external_1.default.close()];
            case 1:
                _a.sent();
                return [4 /*yield*/, db_1.default.close()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
if (false)
    it('auth perfromance test', function () { return __awaiter(void 0, void 0, void 0, function () {
        var dummy, now, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_1.createDummyAndAuthorize()];
                case 1:
                    dummy = _a.sent();
                    now = new Date().getTime();
                    i = 0;
                    _a.label = 2;
                case 2:
                    i += 1;
                    return [4 /*yield*/, user_2.default.auth("Bearer " + dummy.token)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    if (new Date().getTime() - now < 1000) return [3 /*break*/, 2];
                    _a.label = 5;
                case 5:
                    console.log("auth perfromance test: " + i);
                    return [2 /*return*/];
            }
        });
    }); });
describe('auth', function () {
    it('should resolve with true and valid userId for valid token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var dummy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_1.createDummyAndAuthorize()];
                case 1:
                    dummy = _a.sent();
                    return [4 /*yield*/, expect(user_2.default.auth(dummy.token)).resolves.toEqual({ userId: dummy.userId })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should resolve with false for invalid token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_2.default.auth('invalidToken')];
                case 1:
                    response = _a.sent();
                    expect(response).toEqual({ error: { type: 'unauthorized', message: 'Authentication Failed' } });
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('login', function () {
    it('should return JWT token, userId, expireAt to a valid login/password', function () { return __awaiter(void 0, void 0, void 0, function () {
        var dummy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_1.createDummy()];
                case 1:
                    dummy = _a.sent();
                    return [4 /*yield*/, expect(user_2.default.login(dummy.email, dummy.password)).resolves.toEqual({
                            userId: dummy.userId,
                            token: expect.stringMatching(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/),
                            expireAt: expect.any(Date)
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should reject with error if login does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expect(user_2.default.login(faker_1.default.internet.email(), faker_1.default.internet.password())).resolves.toEqual({
                        error: { type: 'invalid_credentials', message: 'Invalid Login/Password' }
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should reject with error if password is wrong', function () { return __awaiter(void 0, void 0, void 0, function () {
        var dummy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_1.createDummy()];
                case 1:
                    dummy = _a.sent();
                    return [4 /*yield*/, expect(user_2.default.login(dummy.email, faker_1.default.internet.password())).resolves.toEqual({
                            error: { type: 'invalid_credentials', message: 'Invalid Login/Password' }
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('createUser', function () {
    it('should resolve with true and valid userId', function () { return __awaiter(void 0, void 0, void 0, function () {
        var email, password, name, username;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = faker_1.default.internet.email();
                    password = faker_1.default.internet.password();
                    name = faker_1.default.name.firstName();
                    username = name;
                    return [4 /*yield*/, expect(user_2.default.createUser(username, email, password, name)).resolves.toEqual({
                            userId: expect.stringMatching(/^[a-f0-9]{24}$/)
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should resolves with false & valid error if duplicate', function () { return __awaiter(void 0, void 0, void 0, function () {
        var email, password, name, username;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = faker_1.default.internet.email();
                    password = faker_1.default.internet.password();
                    name = faker_1.default.name.firstName();
                    username = name;
                    return [4 /*yield*/, user_2.default.createUser(username, email, password, name)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, expect(user_2.default.createUser(username, email, password, name)).resolves.toEqual({
                            error: {
                                type: 'account_already_exists',
                                message: email + " already exists"
                            }
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should reject if invalid input', function () { return __awaiter(void 0, void 0, void 0, function () {
        var email, password, name, username;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = 'invalid@em.c';
                    password = faker_1.default.internet.password();
                    name = faker_1.default.name.firstName();
                    username = name;
                    return [4 /*yield*/, expect(user_2.default.createUser(username, 'em@em.c', password, name)).rejects.toThrowError('validation failed')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});