/**
 * Schema definition for Static Config
 */
import { Schema } from "mongoose";

type Number = Schema.Types.Number;
type String = Schema.Types.String;
type Boolean = Schema.Types.Boolean;

export const StaticDefinition = {
    cat_metric: Number,
    var_metric: Number,
    commented: Number,
    filename: String,
    category: String,
    var_name: String,
    var_val: String,
    __cat_metric: {
        id: Schema.Types.Mixed,
        value: Number
    }
};
