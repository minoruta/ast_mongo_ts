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
export class StaticModelHelper {

    private _model: StaticModel;
    private _categorymetricId: string | ObjectId;
    private _cbs?: StaticModelHelperCB;

    /**
     * @param staticModel       is a model for StaticConfig,
     * @param categorymetricId  is a unique id to identify specific record,
     * @param cbs               is an optiona set of callbacks which allow to add something to results of this helper.
     */
    constructor(staticModel: StaticModel, categorymetricId: string | ObjectId, cbs?: StaticModelHelperCB) {
        this._model = staticModel;
        this._categorymetricId = categorymetricId;
        this._cbs = cbs;
    }

    /**
     * Generate a set of properties to make a static config.
     * @param staticConfigs     is an array of StaticConfigs to generate.
     * @param filename          is specified for the category is belonged to.
     * @param category          is specified for the config is belonged to.
     */
    async create(staticConfigs: StaticConfigs[]): Promise<StaticProperties[]>;
    async create(filename: string, category: string, configs: Configs[]): Promise<StaticProperties[]>;
    async create(...args: any[]): Promise<any> {
        let staticConfigs: StaticConfigs[];
        const sp: StaticProperties[] = [];

        switch (arguments.length) {
            case 1:
                if (!Array.isArray(args[0]))
                    throw new SyntaxError('type of argument was unexpected.');
                staticConfigs = args[0] as StaticConfigs[];
                break;
            case 3:
                if (typeof args[0] === 'string' && typeof args[1] === 'string' && Array.isArray(args[2]))
                    return this.create([{ filename: args[0] as string, category: args[1] as string, configs: args[2] as Configs[] }]);
                throw new SyntaxError('types of arguments was unexpected.');
            default:
                throw new SyntaxError('number of arugments was unexpected.');
        }

        for (const sc of staticConfigs) {
            let cat_metric;
            const filter = this.getFilter(sc);
            const aVar = await this._model.findOne(filter);
            if (aVar) {
                cat_metric = aVar.cat_metric;
                await this._model.remove(filter);
            }
            else {
                // create a record as cat_metric holder.
                const filter = { '__cat_metric.id': this._categorymetricId };
                const metric = await this._model.findOneAndUpdate(filter, {
                        $inc: { '__cat_metric.value': 1 }
                    }, {
                        new: true,
                        upsert: true
                    });
                cat_metric = metric.__cat_metric.value;
            }
            sp.push.apply(sp, this.config2property(cat_metric, sc));
        }
        return sp;
    }

    private getFilter(sc: StaticConfigs): any {
        let filter = {
            filename: sc.filename,
            category: sc.category
        };
        if (this._cbs && this._cbs.cat_metric_filter)
            filter = this._cbs.cat_metric_filter(filter);
        return filter;
    }

    private config2property(cat_metric: number, sc: StaticConfigs): StaticProperties[] {
        const variables: Variable[] = [];
        for (const c of sc.configs) {
            Object.keys(c).forEach(key => {
                variables.push({
                    var_name: key,
                    var_val: c[key]
                });
            });
        }

        const records: StaticProperties[] = [];
        for (const v of variables) {
            let property: StaticProperties = {
                cat_metric: cat_metric,
                var_metric: records.length,
                commented:  0,
                filename: sc.filename,
                category: sc.category,
                var_name: v.var_name,
                var_val: v.var_val
            };
            if (this._cbs && this._cbs.property_result)
                property = this._cbs.property_result(property);
            records.push(property);
        }
        return records;
    }
}
