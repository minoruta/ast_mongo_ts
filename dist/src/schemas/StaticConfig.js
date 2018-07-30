"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Schema definition for Static Config
 */
const mongoose_1 = require("mongoose");
exports.StaticDefinition = {
    cat_metric: Number,
    var_metric: Number,
    commented: Number,
    filename: String,
    category: String,
    var_name: String,
    var_val: String,
    __cat_metric: {
        id: mongoose_1.Schema.Types.Mixed,
        value: Number
    }
};
//# sourceMappingURL=StaticConfig.js.map