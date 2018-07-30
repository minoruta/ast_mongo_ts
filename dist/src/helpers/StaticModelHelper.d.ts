/**
 * Helper library for Static config
 */
import { ObjectId } from 'mongodb';
import { StaticModel } from '../ast_mongo';
import { StaticProperties } from '../properties';
export { ObjectId };
export interface Configs {
    [name: string]: string | number | boolean;
}
export interface StaticConfigs {
    filename: string;
    category: string;
    configs: Configs[];
}
export interface Variable {
    var_name: string;
    var_val: string | number | boolean;
}
export interface StaticModelHelperCB {
    cat_metric_filter?: (filter: any) => any;
    property_result?: (property: StaticProperties) => StaticProperties;
}
/**
 * Helper to make properties for StaticConfig Model
 */
export declare class StaticModelHelper {
    private _model;
    private _categorymetricId;
    private _cbs?;
    /**
     * @param staticModel       is a model for StaticConfig,
     * @param categorymetricId  is a unique id to identify specific record,
     * @param cbs               is an optiona set of callbacks which allow to add something to results of this helper.
     */
    constructor(staticModel: StaticModel, categorymetricId: string | ObjectId, cbs?: StaticModelHelperCB);
    /**
     * Generate a set of properties to make a static config.
     * @param staticConfigs     is an array of StaticConfigs to generate.
     * @param filename          is specified for the category is belonged to.
     * @param category          is specified for the config is belonged to.
     */
    create(staticConfigs: StaticConfigs[]): Promise<StaticProperties[]>;
    create(filename: string, category: string, configs: Configs[]): Promise<StaticProperties[]>;
    private getFilter(sc);
    private config2property(cat_metric, sc);
}
