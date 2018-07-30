/**
 * Property definition for Static config
 */
import { AstProperties } from './common';
export interface StaticProperties extends AstProperties {
    cat_metric?: number;
    var_metric?: number;
    commented?: number;
    filename: string;
    category: string;
    var_name: string;
    var_val: string | number | boolean;
    __cat_metric?: {
        id: string | Object;
        value: number;
    };
}
