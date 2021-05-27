"use strict";
/* eslint no-bitwise: 0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisStorageType = void 0;
var RedisStorageType;
(function (RedisStorageType) {
    RedisStorageType[RedisStorageType["default"] = 0] = "default";
    RedisStorageType[RedisStorageType["returnSet"] = 1] = "returnSet";
    RedisStorageType[RedisStorageType["returnGet"] = 2] = "returnGet";
    RedisStorageType[RedisStorageType["returnDelete"] = 4] = "returnDelete";
    RedisStorageType[RedisStorageType["returnAll"] = 7] = "returnAll";
    RedisStorageType[RedisStorageType["callbackSet"] = 8] = "callbackSet";
    RedisStorageType[RedisStorageType["callbackGet"] = 16] = "callbackGet";
    RedisStorageType[RedisStorageType["callbackDelete"] = 32] = "callbackDelete";
    RedisStorageType[RedisStorageType["callbackAll"] = 7] = "callbackAll";
})(RedisStorageType = exports.RedisStorageType || (exports.RedisStorageType = {}));
var RedisStorage = /** @class */ (function () {
    function RedisStorage() {
        this._failover = new Map();
    }
    RedisStorage.getInstance = function () {
        if (!RedisStorage._instance) {
            RedisStorage._instance = new RedisStorage();
        }
        return RedisStorage._instance;
    };
    RedisStorage.prototype.addFailover = function (token, type) {
        if (type === void 0) { type = RedisStorageType.default; }
        this._failover.set(token, type);
        return this;
    };
    RedisStorage.prototype.clear = function () {
        this._failover.clear();
    };
    RedisStorage.prototype.has = function (token) {
        return this._failover.has(token);
    };
    RedisStorage.prototype.type = function (token) {
        var v = this._failover.get(token);
        if (v === undefined)
            v = RedisStorageType.default;
        return v;
    };
    return RedisStorage;
}());
exports.default = RedisStorage.getInstance();
