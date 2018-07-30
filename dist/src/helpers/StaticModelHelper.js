"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Helper library for Static config
 */
const mongodb_1 = require("mongodb");
exports.ObjectId = mongodb_1.ObjectId;
/**
 * Helper to make properties for StaticConfig Model
 */
class StaticModelHelper {
    /**
     * @param staticModel       is a model for StaticConfig,
     * @param categorymetricId  is a unique id to identify specific record,
     * @param cbs               is an optiona set of callbacks which allow to add something to results of this helper.
     */
    constructor(staticModel, categorymetricId, cbs) {
        this._model = staticModel;
        this._categorymetricId = categorymetricId;
        this._cbs = cbs;
    }
    async create(...args) {
        let staticConfigs;
        const sp = [];
        switch (arguments.length) {
            case 1:
                if (!Array.isArray(args[0]))
                    throw new SyntaxError('type of argument was unexpected.');
                staticConfigs = args[0];
                break;
            case 3:
                if (typeof args[0] === 'string' && typeof args[1] === 'string' && Array.isArray(args[2]))
                    return this.create([{ filename: args[0], category: args[1], configs: args[2] }]);
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
    getFilter(sc) {
        let filter = {
            filename: sc.filename,
            category: sc.category
        };
        if (this._cbs && this._cbs.cat_metric_filter)
            filter = this._cbs.cat_metric_filter(filter);
        return filter;
    }
    config2property(cat_metric, sc) {
        const variables = [];
        for (const c of sc.configs) {
            Object.keys(c).forEach(key => {
                variables.push({
                    var_name: key,
                    var_val: c[key]
                });
            });
        }
        const records = [];
        for (const v of variables) {
            let property = {
                cat_metric: cat_metric,
                var_metric: records.length,
                commented: 0,
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
exports.StaticModelHelper = StaticModelHelper;
//# sourceMappingURL=StaticModelHelper.js.map