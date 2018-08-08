/**
 * A library to handle and manage asterisk objects with ast_mongo.
 */
import * as mongoose from "mongoose";
import { Document, Schema, Model } from 'mongoose';
import { AstProperties } from '../properties';
export interface CAstModelOptions {
    collectionName?: string;
    plugins?: {
        func: (schema: Schema, options?: Object) => void;
        options: any;
    }[];
}
/**
 * CAstModel is a class to make models to handle ast_mongo objects.
 */
export declare class CAstModel<T extends Document, U extends Model<T>, V extends AstProperties> {
    private _connection;
    private _definition;
    private _name;
    private _collection;
    private _schema;
    private _model;
    /**
     * @param connection        is specified for MongoDB connection.
     * @param schemaDefinition  to spcecify schema of model
     * @param modelName         is name of model
     * @param collectionName    is a collection name of MongoDB for the model.
     */
    constructor(connection: mongoose.Connection, schemaDefinition: mongoose.SchemaDefinition, modelName: string, options?: CAstModelOptions);
    readonly model: U;
}
