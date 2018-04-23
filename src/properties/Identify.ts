/**
 * Property definition for Identify
 */
import { AstProperties } from './common';

export interface IdentifyProperties extends AstProperties {
    endpoint: string;
    match: string;
}
