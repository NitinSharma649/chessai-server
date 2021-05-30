"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_cache_1 = __importDefault(require("node-cache"));
var config_1 = __importDefault(require("../config"));
var CacheLocal = /** @class */ (function () {
    function CacheLocal(ttlSeconds) {
        this.cache = new node_cache_1.default({
            stdTTL: ttlSeconds,
            checkperiod: ttlSeconds * 0.2,
            useClones: false
        });
    }
    CacheLocal.getInstance = function () {
        if (!CacheLocal._instance) {
            CacheLocal._instance = new CacheLocal(config_1.default.localCacheTtl);
        }
        return CacheLocal._instance;
    };
    CacheLocal.prototype.get = function (key) {
        return this.cache.get(key);
    };
    CacheLocal.prototype.set = function (key, value) {
        this.cache.set(key, value);
    };
    return CacheLocal;
}());
exports.default = CacheLocal.getInstance();
