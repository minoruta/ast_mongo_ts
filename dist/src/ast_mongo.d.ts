import { Model, Document, Schema, SchemaDefinition, Connection, ConnectionOptions } from 'mongoose';
import { AstProperties, AorProperties, AuthProperties, EndpointProperties, IdentifyProperties, StaticProperties, CdrProperties, CelProperties } from './properties';
import { CAstModel, CAstModelOptions } from './models';
export * from "mongoose";
export { CAstModel, CAstModelOptions, AstProperties, AorProperties, AuthProperties, EndpointProperties, StaticProperties, CdrProperties, CelProperties, };
export * from './helpers/StaticModelHelper';
export * from './helpers/EndpointSetHelper';
export interface AstMongoOptions {
    urls: {
        config?: string;
        cdr?: string;
        cel?: string;
        [key: string]: string;
    };
    plugins?: {
        func: (schema: Schema, options?: object) => void;
        options: any;
    }[];
}
export interface AstMongoConnections {
    config?: Connection;
    cdr?: Connection;
    cel?: Connection;
    [key: string]: Connection;
}
export interface AorDocument extends AorProperties, Document {
}
export interface AuthDocument extends AuthProperties, Document {
}
export interface EndpointDocument extends EndpointProperties, Document {
}
export interface IdentifyDocument extends IdentifyProperties, Document {
}
export interface StaticDocument extends StaticProperties, Document {
}
export interface CdrDocument extends CdrProperties, Document {
}
export interface CelDocument extends CelProperties, Document {
}
export declare type AorModel = Model<AorDocument>;
export declare type AuthModel = Model<AuthDocument>;
export declare type EndpointModel = Model<EndpointDocument>;
export declare type IdentifyModel = Model<IdentifyDocument>;
export declare type StaticModel = Model<StaticDocument>;
export declare type CdrModel = Model<CdrDocument>;
export declare type CelModel = Model<CelDocument>;
/**
 * AstMongo is a class to handle and manage Asterisk objects with ast_mongo.
 */
export declare class AstMongo {
    private _options;
    private _connections;
    private _aor?;
    private _auth?;
    private _endpoint?;
    private _identify?;
    private _static?;
    private _cdr?;
    private _cel?;
    static createConnection(uri: string, options?: ConnectionOptions): Connection & {
        then: Promise<Connection>["then"];
        catch: Promise<Connection>["catch"];
    };
    /**
     * @param options is specified for configuration of ast_mongo.
     */
    constructor(options: AstMongoOptions);
    /**
     * Connect to the specified db.
     */
    connect(): Promise<void>;
    /**
     * Disonnect to the specified db.
     */
    disconnect(): Promise<void>;
    readonly options: AstMongoOptions;
    readonly connections: AstMongoConnections;
    readonly Aor: AorModel;
    readonly Auth: AuthModel;
    readonly Endpoint: EndpointModel;
    readonly Identify: IdentifyModel;
    readonly Static: StaticModel;
    readonly Cdr: CdrModel;
    readonly Cel: CelModel;
    /**
     * Create a model for the specified schema.
     *
     * @param connection    is a connection of mongoose.
     * @param definition    is a definition for schema.
     * @param name          is name of collection for the model.
     * @param options       is a set of options.
     */
    protected Model<T extends Document, U extends Model<T>, V extends AstProperties>(connection: Connection, definition: SchemaDefinition, name: string, options?: CAstModelOptions): Model<T>;
}
