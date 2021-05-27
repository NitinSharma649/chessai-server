"use strict";
/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint no-bitwise: 0 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var redis_storage_1 = __importStar(require("./redis_storage"));
var redis = jest.genMockFromModule('redis');
var RedisClient = /** @class */ (function () {
    function RedisClient() {
        this._callbacks = new Map();
        this._storage = new Map();
    }
    RedisClient.prototype.callReconnectCallbacks = function () {
        var error = this._callbacks.get('error');
        if (error !== undefined)
            error(new Error('mock-redis'));
        var disconnected = this._callbacks.get('disconnected');
        if (disconnected !== undefined)
            disconnected();
        var reconnecting = this._callbacks.get('reconnecting');
        if (reconnecting !== undefined)
            reconnecting();
        var connected = this._callbacks.get('connected');
        if (connected !== undefined)
            connected();
        var ready = this._callbacks.get('ready');
        if (ready !== undefined)
            ready();
    };
    RedisClient.prototype.on = function (state, callback) {
        this._callbacks.set(state, callback);
        if (state === 'ready' || state === 'connected') {
            callback();
        }
    };
    RedisClient.prototype.setex = function (key, timeout, value, callback) {
        if (redis_storage_1.default.has(key) || redis_storage_1.default.has(value)) {
            if (redis_storage_1.default.type(key) & redis_storage_1.RedisStorageType.returnSet || redis_storage_1.default.type(value) & redis_storage_1.RedisStorageType.returnSet) {
                this.callReconnectCallbacks();
                return false;
            }
            else if (redis_storage_1.default.type(key) & redis_storage_1.RedisStorageType.callbackSet || redis_storage_1.default.type(value) & redis_storage_1.RedisStorageType.callbackSet) {
                callback(new Error('Redis connection error'), null);
                this.callReconnectCallbacks();
                return true;
            }
        }
        this._storage.set(key, value);
        callback(null, 'Ok');
        return true;
    };
    RedisClient.prototype.hset = function (key, key2, value, callback) {
        return this.setex(key, 0, value, callback);
    };
    RedisClient.prototype.del = function (key, callback) {
        if (redis_storage_1.default.has(key)) {
            if (redis_storage_1.default.type(key) & redis_storage_1.RedisStorageType.returnDelete) {
                this.callReconnectCallbacks();
                return false;
            }
            else if (redis_storage_1.default.type(key) & redis_storage_1.RedisStorageType.callbackDelete) {
                callback(new Error('Redis connection error'), null);
                this.callReconnectCallbacks();
                return true;
            }
        }
        this._storage.delete(key);
        callback(null, '1');
        return true;
    };
    RedisClient.prototype.get = function (key, callback) {
        if (redis_storage_1.default.has(key)) {
            if (redis_storage_1.default.type(key) & redis_storage_1.RedisStorageType.returnGet) {
                this.callReconnectCallbacks();
                return false;
            }
            else if (redis_storage_1.default.type(key) & redis_storage_1.RedisStorageType.callbackGet) {
                callback(new Error('Redis connection error'), null);
                this.callReconnectCallbacks();
                return true;
            }
        }
        var value = this._storage.get(key);
        callback(null, value !== undefined ? value : null);
        return true;
    };
    RedisClient.prototype.hmget = function (key, key2, callback) {
        return this.get(key, callback);
    };
    RedisClient.prototype.quit = function (cb) {
        var end = this._callbacks.get('end');
        if (end !== undefined)
            end();
        cb();
    };
    return RedisClient;
}());
function createClient() {
    return new RedisClient();
}
redis.createClient = createClient;
module.exports = redis;
