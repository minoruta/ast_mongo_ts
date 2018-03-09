/**
 * Schema definition for Auth
 */
import { Schema } from "mongoose";

type Number = Schema.Types.Number;
type String = Schema.Types.String;
type Boolean = Schema.Types.Boolean;
const Unsigned = { type: Number, min: 0, integer: true };

export const AuthDefinition = {
    _id: String,
    auth_type: String,
    username: String,
    password: String,
    md5_cred: String,
    realm: String,
    nonce_lifetime: Unsigned
};
