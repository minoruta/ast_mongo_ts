/**
 * A library to handle and manage asterisk objects with ast_mongo.
 */
import * as mongoose from "mongoose";
import { Document, Schema, Model, Connection } from 'mongoose';
import { AstProperties } from '../properties';

export interface CAstModelOptions {
    collectionName?: string;
    plugins?: { func: (schema: Schema, options?: Object) => void, options: any }[];
}

/**
 * CAstModel is a class to make models to handle ast_mongo objects.
 */
export class CAstModel<T extends Document, U extends Model<T>, V extends AstProperties> {

    private _connection: mongoose.Connection;
    private _definition: mongoose.SchemaDefinition;
    private _name: string;
    private _collection: string;
    private _schema: Schema;
    private _model: U;

    /**
     * @param connection        is specified for MongoDB connection.
     * @param schemaDefinition  to spcecify schema of model
     * @param modelName         is name of model
     * @param collectionName    is a collection name of MongoDB for the model.
     */
    constructor(
        connection: mongoose.Connection,
        schemaDefinition: mongoose.SchemaDefinition,
        modelName: string,
        options?: CAstModelOptions) {

        this._connection = connection;
        this._definition = schemaDefinition;
        this._name = modelName;

        if (options && options.collectionName)
            this._collection = options.collectionName;
        else
            this._collection = `ps_${modelName.toLowerCase()}s`;

        this._schema = new Schema(schemaDefinition);

        if (options && options.plugins) {
            for (const plugin of options.plugins)
                this._schema.plugin(plugin.func, plugin.options);
        }

        this._model = connection.model<T, U>(this._name, this._schema, this._collection);
    }

    get model(): U {
        return this._model;
    }
}
