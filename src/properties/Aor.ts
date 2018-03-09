/**
 * Property definition for Aor
 */
import { AstProperties } from './common';

export interface AorProperties extends AstProperties {
    contact?: string;
    minimum_expiration?: number;
    default_expiration?: number;
    qualify_timeout?: number;
    support_path?: boolean;
    max_contacts?: number;
    authenticate_qualify?: boolean;
    maximum_expiration?: number;
    qualify_frequency?: number;
    remove_existing?: boolean;
}
