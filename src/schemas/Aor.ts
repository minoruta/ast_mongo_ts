/**
 * Schema definition for Aor
 */
import { Schema } from "mongoose";

type Number = Schema.Types.Number;
type String = Schema.Types.String;
type Boolean = Schema.Types.Boolean;
const Unsigned = { type: Number, min: 0, integer: true };

export const AorDefinition = {
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
