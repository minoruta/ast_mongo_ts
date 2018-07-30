"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Helper library for Endpoint set
 */
class EndpointSetHelper {
    /**
     * @param astMongo  is AstMongo object.
     * @param cbs       is set of callbacks.
     */
    constructor(astMongo, cbs) {
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
    async create(id, eps) {
        if (eps.aor && !eps.aor._id)
            eps.aor._id = id;
        if (eps.auth && !eps.auth._id)
            eps.auth._id = id;
        if (eps.endpoint) {
            if (!eps.endpoint._id)
                eps.endpoint._id = id;
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
exports.EndpointSetHelper = EndpointSetHelper;
//# sourceMappingURL=EndpointSetHelper.js.map