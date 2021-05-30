"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../config"));
var logger_1 = __importDefault(require("./logger"));
var redis = config_1.default.redisUrl === 'redis-mock' ? require('redis-mock') : require('redis');
var Cache = /** @class */ (function () {
    function Cache() {
        this._initialConnection = true;
    }
    Cache.getInstance = function () {
        if (!Cache._instance) {
            Cache._instance = new Cache();
        }
        return Cache._instance;
    };
    Cache.prototype.open = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._client = redis.createClient(config_1.default.redisUrl);
            var client = _this._client;
            client.on('connect', function () {
                logger_1.default.info('Redis: connected');
            });
            client.on('ready', function () {
                if (_this._initialConnection) {
                    _this._initialConnection = false;
                    resolve();
                }
                logger_1.default.info('Redis: ready');
            });
            client.on('reconnecting', function () {
                logger_1.default.info('Redis: reconnecting');
            });
            client.on('end', function () {
                logger_1.default.info('Redis: end');
            });
            client.on('disconnected', function () {
                logger_1.default.error('Redis: disconnected');
            });
            client.on('error', function (err) {
                logger_1.default.error("Redis: error: " + err);
            });
        });
    };
    Cache.prototype.close = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._client.quit(function () {
                resolve();
            });
        });
    };
    Cache.prototype.setProp = function (key, value, expireAfter) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var result = _this._client.setex(key, expireAfter, value, function (error) {
                if (error)
                    return reject(error);
                resolve();
            });
            if (result !== undefined && result === false) {
                reject(new Error('Redis connection error'));
            }
        });
    };
    Cache.prototype.getProp = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var result = _this._client.get(key, function (error, result) {
                if (error)
                    return reject(error);
                resolve(result ? result : undefined);
            });
            if (result !== undefined && result === false) {
                reject(new Error('Redis connection error'));
            }
        });
    };
    return Cache;
}());
exports.default = Cache.getInstance();
