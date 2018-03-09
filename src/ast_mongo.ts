/**
 * Nodejs library for supporting the ast_mongo
 */
import * as mongoose from "mongoose";
import {
    Model,
    Document,
    Schema,
    SchemaDefinition,
    Connection,
    createConnection,
    plugin
} from 'mongoose';

import {
    AstProperties,
    AorProperties,
    AuthProperties,
    EndpointProperties,
    IdentifyProperties,
    StaticProperties,
    CdrProperties,
    CelProperties
} from './properties';

import {
    AorDefinition,
    AuthDefinition,
    EndpointDefinition,
    IdentifyDefinition,
    StaticDefinition,
    CdrDefinition,
    CelDefinition
} from './schemas';

import {
    CAstModel,
    CAstModelOptions,
} from './models';

import * as integerValidator from 'mongoose-integer';

export {
    AstProperties,
    AorProperties,
    AuthProperties,
    EndpointProperties,
    StaticProperties,
    CdrProperties,
    CelProperties
};
export * from './helpers/StaticModelHelper';
export * from './helpers/EndpointSetHelper';

export interface AstMongoOptions {
    urls: {
        config?: string;
        cdr?: string;
        cel?: string;
    };
    plugins?: { func: (schema: Schema, options?: object) => void, options: any }[];
}

export interface AorDocument extends AorProperties, Document {}
export interface AuthDocument extends AuthProperties, Document {}
export interface EndpointDocument extends EndpointProperties, Document {}
export interface IdentifyDocument extends IdentifyProperties, Document {}
export interface StaticDocument extends StaticProperties, Document {}
export interface CdrDocument extends CdrProperties, Document {}
export interface CelDocument extends CelProperties, Document {}

export type AorModel = Model<AorDocument>;
export type AuthModel = Model<AuthDocument>;
export type EndpointModel = Model<EndpointDocument>;
export type IdentifyModel = Model<IdentifyDocument>;
export type StaticModel = Model<StaticDocument>;
export type CdrModel = Model<CdrDocument>;
export type CelModel = Model<CelDocument>;

/**
 * AstMongo is a class to handle and manage Asterisk objects with ast_mongo.
 */
export class AstMongo {

    private _options: AstMongoOptions;
    private _connections: {
        config?: Connection;
        cdr?: Connection;
        cel?: Connection;
    };
    private _aor?: AorModel;
    private _auth?: AuthModel;
    private _endpoint?: EndpointModel;
    private _identify?: IdentifyModel;
    private _static?: StaticModel;
    private _cdr?: CdrModel;
    private _cel?: CelModel;

    /**
     * @param options is specified for configuration of ast_mongo.
     */
    constructor(options: AstMongoOptions) {
        (<any>mongoose).Promise = Promise;
        this._options = options;
        this._connections = {};
    }

    /**
     * Connect to the specified db.
     */
    async connect() {
        if (this._connections.config || this._connections.cdr || this._connections.cel)
            throw new Error("already connected");

        plugin(integerValidator);

        if (this._options.urls.config) {
            let options: CAstModelOptions = { plugins: this._options.plugins };
            const connection = await createConnection(this._options.urls.config);
            this._aor = this.Model<AorDocument, AorModel, AorProperties>(connection, AorDefinition, 'Aor', options);
            this._auth = this.Model<AuthDocument, AuthModel, AuthProperties>(connection, AuthDefinition, 'Auth', options);
            this._endpoint = this.Model<EndpointDocument, EndpointModel, EndpointProperties>(connection, EndpointDefinition, 'Endpoint', options);

            options = {
                plugins: this._options.plugins,
                collectionName: 'ps_endpoint_id_ips'
            };
            this._identify = this.Model<IdentifyDocument, IdentifyModel, IdentifyProperties>(connection, IdentifyDefinition, 'Identify', options);

            options = {
                plugins: this._options.plugins,
                collectionName: 'ast_config'
            };
            this._static = this.Model<StaticDocument, StaticModel, StaticProperties>(connection, StaticDefinition, 'Static', options);
            this._connections.config = connection;
        }
        if (this._options.urls.cdr) {
            const options = {
                plugins: this._options.plugins,
                collectionName: 'cdr'
            };
            const connection = await createConnection(this._options.urls.cdr);
            this._cdr = this.Model<CdrDocument, CdrModel, CdrProperties>(connection, CdrDefinition, 'Cdr', options);
            this._connections.cdr = connection;
        }
        if (this._options.urls.cel) {
            const options = {
                plugins: this._options.plugins,
                collectionName: 'cel'
            };
            const connection = await createConnection(this._options.urls.cel);
            this._cel = this.Model<CelDocument, CelModel, CelProperties>(connection, CelDefinition, 'Cel', options);
            this._connections.cel = connection;
        }
    }

    /**
     * Disonnect to the specified db.
     */
    async disconnect() {
        if (this._connections.config)
            await this._connections.config.close();
        if (this._connections.cdr)
            await this._connections.cdr.close();
        if (this._connections.cel)
            await this._connections.cel.close();
        this._connections.config = undefined;
        this._connections.cdr = undefined;
        this._connections.cel = undefined;
        this._aor = undefined;
        this._auth = undefined;
        this._endpoint = undefined;
        this._static = undefined;
        this._cdr = undefined;
        this._cel = undefined;
    }

    get Aor(): AorModel {
        if (!this._aor)
            throw new Error("No Model, not yet initialized");
        return this._aor;
    }
    get Auth(): AuthModel {
        if (!this._auth)
            throw new Error("No Model, not yet initialized");
        return this._auth;
    }
    get Endpoint(): EndpointModel {
        if (!this._endpoint)
            throw new Error("No Model, not yet initialized");
        return this._endpoint;
    }
    get Identify(): IdentifyModel {
        if (!this._identify)
            throw new Error("No Model, not yet initialized");
        return this._identify;
    }
    get Static(): StaticModel {
        if (!this._static)
            throw new Error("No Model, not yet initialized");
        return this._static;
    }
    get Cdr(): CdrModel {
        if (!this._cdr)
            throw new Error("No Model, not yet initialized");
        return this._cdr;
    }
    get Cel(): CelModel {
        if (!this._cel)
            throw new Error("No Model, not yet initialized");
        return this._cel;
    }

    /**
     * Create a model for the specified schema.
     *
     * @param connection    is a connection of mongoose.
     * @param definition    is a definition for schema.
     * @param name          is name of collection for the model.
     * @param options       is a set of options.
     */
    private Model<T extends Document, U extends Model<T>, V extends AstProperties>(
        connection: Connection,
        definition: SchemaDefinition,
        name: string,
        options?: CAstModelOptions
    ): Model<T> {
        const model = new CAstModel<T, U, V>(connection, definition, name, options);
        return model.model;
    }
}
