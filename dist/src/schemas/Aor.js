"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Unsigned = { type: Number, min: 0, integer: true };
exports.AorDefinition = {
    _id: String,
    contact: String,
    minimum_expiration: Unsigned,
    default_expiration: Unsigned,
    qualify_timeout: Unsigned,
    support_path: Boolean,
    max_contacts: Unsigned,
    authenticate_qualify: Boolean,
    maximum_expiration: Unsigned,
    qualify_frequency: Unsigned,
    remove_existing: Boolean
};
//# sourceMappingURL=Aor.js.map