"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var mongoose_1 = require("mongoose");
var validator_1 = __importDefault(require("validator"));
var userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, trim: true, validate: [validator_1.default.isEmail, 'do not match email regex'] },
    created: { type: Date, default: Date.now },
}, { strict: true })
    .index({ email: 1, username: 1 }, { unique: true, collation: { locale: 'en_US', strength: 1 }, sparse: true });
userSchema.pre('save', function (next) {
    var _this = this;
    if (this.isModified('password')) {
        // generate hash for password
        bcrypt_1.default.genSalt(10, function (err, salt) {
            /* istanbul ignore next */
            if (err)
                return next(err);
            bcrypt_1.default.hash(_this.password, salt, function (err, hash) {
                /* istanbul ignore next */
                if (err)
                    return next(err);
                _this.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});
// userSchema.set('toJSON', {
//     transform: function (doc, ret, options) {
//         ret.created = ret.created.getTime()
//         delete ret.__v
//         delete ret._id
//         delete ret.password
//     }
// })
userSchema.methods.comparePassword = function (candidatePassword) {
    var password = this.password;
    return new Promise(function (resolve, reject) {
        bcrypt_1.default.compare(candidatePassword, password, function (err, isMatch) {
            console.log("Sdf");
            if (err)
                return reject(err);
            return resolve(isMatch);
        });
    });
};
exports.User = mongoose_1.model('User', userSchema);
exports.default = exports.User;
