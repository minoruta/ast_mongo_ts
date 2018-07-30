"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * CAstModel is a class to make models to handle ast_mongo objects.
 */
class CAstModel {
    /**
     * @param connection        is specified for MongoDB connection.
     * @param schemaDefinition  to spcecify schema of model
     * @param modelName         is name of model
     * @param collectionName    is a collection name of MongoDB for the model.
     */
    constructor(connection, schemaDefinition, modelName, options) {
        this._connection = connection;
        this._definition = schemaDefinition;
        this._name = modelName;
        if (options && options.collectionName)
            this._collection = options.collectionName;
        else
            this._collection = `ps_${modelName.toLowerCase()}s`;
        this._schema = new mongoose_1.Schema(schemaDefinition);
        if (options && options.plugins) {
            for (const plugin of options.plugins)
                this._schema.plugin(plugin.func, plugin.options);
        }
        this._model = connection.model(this._name, this._schema, this._collection);
    }
    get model() {
        return this._model;
    }
}
exports.CAstModel = CAstModel;
//# sourceMappingURL=CAstModel.js.map