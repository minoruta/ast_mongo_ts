/**
 * Helper library for Endpoint set
 */
import {
    AstMongo,
    AorModel,
    AuthModel,
    EndpointModel
} from '../ast_mongo';
import {
    AorProperties,
    AuthProperties,
    EndpointProperties
} from '../properties';

export interface EndpointSet {
    aor?: AorProperties;
    auth?: AuthProperties;
    endpoint?: EndpointProperties;
}

export interface EndpointSetHelperCB {
    createWith?: (property: EndpointSet) => EndpointSet;
}

/**
 * Helper library for Endpoint set
 */
export class EndpointSetHelper {

    private _aor: AorModel;
    private _auth: AuthModel;
    private _endpoint: EndpointModel;
    private _cbs?: EndpointSetHelperCB;

    /**
     * @param astMongo  is AstMongo object.
     * @param cbs       is set of callbacks.
     */
    constructor(astMongo: AstMongo, cbs?: EndpointSetHelperCB) {
        if (!astMongo.Aor || !astMongo.Auth || !astMongo.Endpoint)
            throw new Error('Any (or all) of Aor, Auth and Endpoint are not available.');
        this._aor = astMongo.Aor;
        this._auth = astMongo.Auth;
        this._endpoint = astMongo.Endpoint;
        this._cbs = cbs;
    }

    /**
     * Create a set of endpoint; Endpoint, Aor and Auth.
     * @param id    is an id of endpoint set to create.
     * @param eps   is a set of properties to make endpoint set.
     */
    async create(id: string, eps: EndpointSet): Promise<void> {
        if (eps.aor && !(eps.aor as any)._id)
            (eps.aor as any)._id = id;
        if (eps.auth && !(eps.auth as any)._id)
            (eps.auth as any)._id = id;
        if (eps.endpoint) {
            if (!(eps.endpoint as any)._id)
                (eps.endpoint as any)._id = id;
            if (!eps.endpoint.aors)
                eps.endpoint.aors = id;
            if (!eps.endpoint.auth)
                eps.endpoint.auth = id;
        }

        if (this._cbs && this._cbs.createWith)
            eps = this._cbs.createWith(eps);

        if (eps.aor)
            await this._aor.create(eps.aor);
        if (eps.auth)
            await this._auth.create(eps.auth);
        if (eps.endpoint)
            await this._endpoint.create(eps.endpoint);
    }
}
