/**
 * Schema definition for identify
 */
import { Schema } from "mongoose";

type String = Schema.Types.String;

export const IdentifyDefinition = {
    endpoint: String,
    match: String,
};
