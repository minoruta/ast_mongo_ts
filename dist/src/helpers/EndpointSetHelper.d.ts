/**
 * Helper library for Endpoint set
 */
import { AstMongo } from '../ast_mongo';
import { AorProperties, AuthProperties, EndpointProperties } from '../properties';
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
export declare class EndpointSetHelper {
    private _aor;
    private _auth;
    private _endpoint;
    private _cbs?;
    /**
     * @param astMongo  is AstMongo object.
     * @param cbs       is set of callbacks.
     */
    constructor(astMongo: AstMongo, cbs?: EndpointSetHelperCB);
    /**
     * Create a set of endpoint; Endpoint, Aor and Auth.
     * @param id    is an id of endpoint set to create.
     * @param eps   is a set of properties to make endpoint set.
     */
    create(id: string, eps: EndpointSet): Promise<void>;
}
