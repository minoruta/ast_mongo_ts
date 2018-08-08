/**
 * Schema definition for Static Config
 */
import { Schema } from "mongoose";
export declare const StaticDefinition: {
    cat_metric: NumberConstructor;
    var_metric: NumberConstructor;
    commented: NumberConstructor;
    filename: StringConstructor;
    category: StringConstructor;
    var_name: StringConstructor;
    var_val: StringConstructor;
    __cat_metric: {
        id: typeof Schema.Types.Mixed;
        value: NumberConstructor;
    };
};
