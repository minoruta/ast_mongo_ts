"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Unsigned = { type: Number, min: 0, integer: true };
exports.AuthDefinition = {
    _id: String,
    auth_type: String,
    username: String,
    password: String,
    md5_cred: String,
    realm: String,
    nonce_lifetime: Unsigned
};
//# sourceMappingURL=Auth.js.map