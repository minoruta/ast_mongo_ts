"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Nodejs library for supporting the ast_mongo
 */
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const schemas_1 = require("./schemas");
const models_1 = require("./models");
exports.CAstModel = models_1.CAstModel;
const integerValidator = require("mongoose-integer");
__export(require("mongoose"));
__export(require("./helpers/StaticModelHelper"));
__export(require("./helpers/EndpointSetHelper"));
/**
 * AstMongo is a class to handle and manage Asterisk objects with ast_mongo.
 */
class AstMongo {
    static createConnection(uri, options) {
        const opt = Object.assign(options || {}, { useNewUrlParser: true });
        return mongoose_1.createConnection(uri, opt);
    }
    /**
     * @param options is specified for configuration of ast_mongo.
     */
    constructor(options) {
        mongoose.Promise = Promise;
        this._options = options;
        this._connections = {};
    }
    /**
     * Connect to the specified db.
     */
    async connect() {
        if (this._connections.config || this._connections.cdr || this._connections.cel)
            throw new Error("already connected");
        mongoose_1.plugin(integerValidator);
        if (this._options.urls.config) {
            let options = { plugins: this._options.plugins };
            const connection = await AstMongo.createConnection(this._options.urls.config);
            this._aor = this.Model(connection, schemas_1.AorDefinition, 'Aor', options);
            this._auth = this.Model(connection, schemas_1.AuthDefinition, 'Auth', options);
            this._endpoint = this.Model(connection, schemas_1.EndpointDefinition, 'Endpoint', options);
            options = {
                plugins: this._options.plugins,
                collectionName: 'ps_endpoint_id_ips'
            };
            this._identify = this.Model(connection, schemas_1.IdentifyDefinition, 'Identify', options);
            options = {
                plugins: this._options.plugins,
                collectionName: 'ast_config'
            };
            this._static = this.Model(connection, schemas_1.StaticDefinition, 'Static', options);
            this._connections.config = connection;
        }
        if (this._options.urls.cdr) {
            const options = {
                plugins: this._options.plugins,
                collectionName: 'cdr'
            };
            const connection = await AstMongo.createConnection(this._options.urls.cdr);
            this._cdr = this.Model(connection, schemas_1.CdrDefinition, 'Cdr', options);
            this._connections.cdr = connection;
        }
        if (this._options.urls.cel) {
            const options = {
                plugins: this._options.plugins,
                collectionName: 'cel'
            };
            const connection = await AstMongo.createConnection(this._options.urls.cel);
            this._cel = this.Model(connection, schemas_1.CelDefinition, 'Cel', options);
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
    get options() {
        return this._options;
    }
    get connections() {
        return this._connections;
    }
    get Aor() {
        if (!this._aor)
            throw new Error("No Model, not yet initialized");
        return this._aor;
    }
    get Auth() {
        if (!this._auth)
            throw new Error("No Model, not yet initialized");
        return this._auth;
    }
    get Endpoint() {
        if (!this._endpoint)
            throw new Error("No Model, not yet initialized");
        return this._endpoint;
    }
    get Identify() {
        if (!this._identify)
            throw new Error("No Model, not yet initialized");
        return this._identify;
    }
    get Static() {
        if (!this._static)
            throw new Error("No Model, not yet initialized");
        return this._static;
    }
    get Cdr() {
        if (!this._cdr)
            throw new Error("No Model, not yet initialized");
        return this._cdr;
    }
    get Cel() {
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
    Model(connection, definition, name, options) {
        const model = new models_1.CAstModel(connection, definition, name, options);
        return model.model;
    }
}
exports.AstMongo = AstMongo;
//# sourceMappingURL=ast_mongo.js.map