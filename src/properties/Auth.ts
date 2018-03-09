/**
 * Property definition for Auth
 */
import { AstProperties } from './common';

export interface AuthProperties extends AstProperties {
    auth_type: string;
    username: string;
    password?: string;
    md5_cred?: string;
    realm?: string;
    nonce_lifetime?: number;
}
