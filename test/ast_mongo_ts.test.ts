import {} from 'jest';
import {
    AstMongo, AstMongoOptions, StaticProperties,
    StaticModelHelper, StaticModelHelperCB,
    EndpointSet, EndpointSetHelper, EndpointSetHelperCB
} from '../src/ast_mongo';
//
//
//
const unique_id = '000000000000000000000001';

const ENV = process.env;
const astMongoOptions: AstMongoOptions = {
    urls: {
        config: ENV.MONGO_CONFIG || ENV.npm_package_config_config || 'mongodb://127.0.0.1:27017/config_test',
        cdr: ENV.MONGO_CDR || ENV.npm_package_config_cdr || 'mongodb://127.0.0.1:27017/cdr_test',
        cel: ENV.MONGO_CEL || ENV.npm_package_config_cel || 'mongodb://127.0.0.1:27017/cel_test'
    }
};

let ast_mongo: AstMongo;
let smh: StaticModelHelper;
let esh: EndpointSetHelper;

/**
 * Delete _id property from the specified object.
 */
function deleteId(data: any): object[] {
    if (data.constructor !== Array)
        return deleteId([data]);

    const results = [];
    for (const obj of JSON.parse(JSON.stringify(data))) {
        const copy: any = {};
        for (const key of Object.keys(obj)) {
            if (key != '_id')
                copy[key] = obj[key];
        }
        results.push(copy);
    }
    return results;
}
//
//
//
describe('AstMongo.ts connection & disconnection', () => {
    test ('construction', () => {
        ast_mongo = new AstMongo(astMongoOptions);
    });
    test ('connect', async () => {
        await ast_mongo.connect();
    });
    test ('disconnect', async () => {
        await ast_mongo.disconnect();
    });
});

describe('AstMongo.ts mongoose-integer', () => {
    test ('construction', () => {
        ast_mongo = new AstMongo(astMongoOptions);
    });
    test ('connect', async () => {
        await ast_mongo.connect();
    });
    test ('with real number', async () => {
        let throwed = false;
        try {
            const aor = await new ast_mongo.Aor({
                _id: 'alice',
                max_contacts: 1.23
            });
            const result = await aor.save();
        }
        catch (e) {
            expect(e).toMatchSnapshot();
            throwed = true;
        }
        expect(throwed).toBeTruthy();
    });
    test ('with negative integer', async () => {
        let throwed = false;
        try {
            const aor = await new ast_mongo.Aor({
                _id: 'alice',
                max_contacts: -1
            });
            const result = await aor.save();
        }
        catch (e) {
            expect(e).toMatchSnapshot();
            throwed = true;
        }
        expect(throwed).toBeTruthy();
    });
    test ('disconnect', async () => {
        await ast_mongo.disconnect();
    });
});

describe('AstMongo.ts with Aor', () => {
    test ('construction', () => {
        ast_mongo = new AstMongo(astMongoOptions);
    });

    describe('aor', () => {
        test ('connect', async () => {
            await ast_mongo.connect();
        });

        test ('Drop a collection of Aor', async () => {
            await ast_mongo.Aor.remove({});
        });

        test ('Create an Aor with valid record', async () => {
            const result = await ast_mongo.Aor.create({
                    _id: 'alice',
                    max_contacts: 1,
                    contact: 'sip:6001@192.0.2.1:5060',
                });
            expect(result).toMatchSnapshot();
        });

        test ('Read it back', async () => {
            const result = await ast_mongo.Aor.findById('alice');
            expect(result).toMatchSnapshot();
        });

        test ('Read it back', async () => {
            const result = await ast_mongo.Aor.findById('alice');
            expect(result).toMatchSnapshot();
        });

        test ('Update it', async () => {
            const result = await ast_mongo.Aor.update(
                { _id: 'alice' }, {max_contacts: 2}
            );
            expect(result).toMatchSnapshot();
        });

        test ('Read it again', async () => {
            const result = await ast_mongo.Aor.findById('alice');
            expect(result).toMatchSnapshot();
        });

        test ('Remove it', async () => {
            await ast_mongo.Aor.remove({ _id: 'alice' });
        });

        test ('Check if it has been removed', async () => {
            const result = await ast_mongo.Aor.findById('alice');
            expect(result).toMatchSnapshot();
        });

        test ('disconnect', async () => {
            await ast_mongo.disconnect();
        });
    });
});

describe('AstMongo.ts with Endpoint Set', () => {
    beforeAll ( async () => {
        ast_mongo = new AstMongo(astMongoOptions);
        await ast_mongo.connect();
        await ast_mongo.Aor.remove({});
        await ast_mongo.Auth.remove({});
        await ast_mongo.Endpoint.remove({});
        esh = new EndpointSetHelper(ast_mongo);
    });
    test ('create an endpoint set #1', async () => {
        await esh.create('6001', {
            endpoint: {
                context: 'default',
                allow: 'ulaw',
                transport: 'simpletrans',
            },
            aor: {
                max_contacts: 1,
                contact: 'sip:6001@192.0.2.1:5060'
            },
            auth: {
                auth_type: 'userpass',
                password: '6001',
                username: '6001'
            }
        });
        const result = await ast_mongo.Endpoint.findOne({_id: '6001'})
            .populate('auth');
        expect(result).toMatchSnapshot();
    });
    test ('create an endpoint set #2', async () => {
        await esh.create('6002', {
            endpoint: {
                context: 'default',
                allow: 'ulaw',
                transport: 'transport-udp',
            },
            aor: {
                max_contacts: 1,
                contact: 'sip:6002@192.0.2.2:5060',
            },
            auth: {
                auth_type: 'userpass',
                md5_cred: '51e63a3da6425a39aecc045ec45f1ae8',
                username: '6002'
            }
        });
        const result = await ast_mongo.Endpoint.findOne({_id: '6001'})
            .populate('auth');
        expect(result).toMatchSnapshot();
    });
    test ('add identify as realtime resources', async () => {
        const results = await ast_mongo.Identify.create({
            endpoint: 'my_realtime_trunk',
            match: [ '203.0.113.11', '203.0.113.12', '203.0.113.13' ]
        });
        expect(deleteId(results)).toMatchSnapshot();
        const identifies = await ast_mongo.Identify
            .find({})
            .select('-_id');
        expect(identifies).toMatchSnapshot();
    });
    test ('clean up #1', async () => {
        await ast_mongo.Endpoint.remove({ _id: '6001' });
        await ast_mongo.Aor.remove({ _id: '6001' });
        await ast_mongo.Auth.remove({ _id: '6001' });
        let result = await ast_mongo.Endpoint.find();
        expect(result).toMatchSnapshot();
        result = await ast_mongo.Aor.find();
        expect(result).toMatchSnapshot();
        result = await ast_mongo.Auth.find();
        expect(result).toMatchSnapshot();
    });
    test ('clean up #2', async () => {
        await ast_mongo.Endpoint.remove({ _id: '6002' });
        await ast_mongo.Aor.remove({ _id: '6002' });
        await ast_mongo.Auth.remove({ _id: '6002' });
        let result = await ast_mongo.Endpoint.find();
        expect(result).toMatchSnapshot();
        result = await ast_mongo.Aor.find();
        expect(result).toMatchSnapshot();
        result = await ast_mongo.Auth.find();
        expect(result).toMatchSnapshot();
    });
    test ('clean up #3', async () => {
        await ast_mongo.Identify.remove({ endpoint: 'my_realtime_trunk' });
        const result = await ast_mongo.Identify.find();
        expect(result).toMatchSnapshot();
    });
    test ('disconnect', async () => {
        await ast_mongo.disconnect();
    });
});

describe('AstMongo.ts with StaticConfig', () => {
    beforeAll ( async () => {
        ast_mongo = new AstMongo(astMongoOptions);
        await ast_mongo.connect();
        await ast_mongo.Static.remove({});
        smh = new StaticModelHelper(ast_mongo.Static, unique_id);
    });
    test ('create a transport as StaticConfigs', async () => {
        const properties = await smh.create(
            'pjsip.conf', 'transport-udp', [{
                type: 'transport',
                protocol: 'udp',
                bind: '0.0.0.0'
            }]);
        const results = await ast_mongo.Static.create(properties);
        expect(deleteId(results)).toMatchSnapshot();
    });
    test ('add dial plans as StaticConfigs', async () => {
        const properties = await smh.create(
            'extensions.conf', 'context1', [
                { exten: '_6.,1,NoOp()'},
                { exten: '_6.,n,Dial(PJSIP/${EXTEN})'},
                { exten: '_6.,n,Hangup()'},
                { exten: '_7.,1,NoOp()'},
                { exten: '_7.,n,Dial(PJSIP/${EXTEN})'},
                { exten: '_7.,n,Hangup()'}
            ]);
        const results = await ast_mongo.Static.create(properties);
        expect(deleteId(results)).toMatchSnapshot();
    });
    test ('add transports as StaticConfigs', async () => {
        const properties = await smh.create([{
            filename: 'pjsip.conf',
            category: 'transport-tcp',
            configs: [{
                type: 'transport',
                protocol: 'tcp',
                bind: '0.0.0.0'
            }]
        }, {
            filename: 'pjsip.conf',
            category: 'transport-wss',
            configs: [{
                type: 'transport',
                protocol: 'wss',
                bind: '0.0.0.0'
            }]
        }]);
        const results = await ast_mongo.Static.create(properties);
        expect(deleteId(results)).toMatchSnapshot();
    });
    test ('add identify as StaticConfigs', async () => {
        const properties = await smh.create(
            'pjsip.conf', 'identify', [
                { endpoint: 'my_static_trunk'},
                { match: '203.0.113.1'},
                { match: '203.0.113.2'},
                { match: '203.0.113.3'}
            ]);
        const results = await ast_mongo.Static.create(properties);
        expect(deleteId(results)).toMatchSnapshot();
    });
    test ('read back extensions', async () => {
        const results = await ast_mongo.Static
            .find({ filename: 'extensions.conf' })
            .sort('cat_metric var_metric');
        expect(deleteId(results)).toMatchSnapshot();
    });
    test ('read back pjsip', async () => {
        const results = await ast_mongo.Static
            .find({ filename: 'pjsip.conf' })
            .sort('cat_metric var_metric');
        expect(deleteId(results)).toMatchSnapshot();
    });
    test ('delete extensions', async () => {
        const result = await ast_mongo.Static
            .remove({ filename: 'extensions.conf' });
        expect(result).toMatchSnapshot();
    });
    test ('read back to check', async () => {
        const results = await ast_mongo.Static
            .find()
            .sort('cat_metric var_metric');
        expect(deleteId(results)).toMatchSnapshot();
    });
    test ('delete pjsip', async () => {
        const result = await ast_mongo.Static
            .remove({ filename: 'pjsip.conf' });
        expect(result).toMatchSnapshot();
    });
    test ('read back to check #2', async () => {
        const results = await ast_mongo.Static
            .find()
            .sort('cat_metric var_metric _id');
        expect(deleteId(results)).toMatchSnapshot();
    });
    test ('disconnect', async () => {
        await ast_mongo.disconnect();
    });
});

describe('AstMongo.ts with Cdr & Cel', () => {
    test ('construct & connect', async () => {
        ast_mongo = new AstMongo(astMongoOptions);
        await ast_mongo.connect();
    });
    describe('cdr', () => {
        beforeAll ( async () => {
            const data = [{
                clid: "6002 <6002>", src: "6002", dst: "6001", dcontext: "context1",
                channel: "PJSIP/6002-00000000", dstchannel: "PJSIP/6001-00000001",
                lastapp: "Dial", lastdata: "PJSIP/6001", disposition: "NO ANSWER",
                amaflags: "DOCUMENTATION", accountcode: "", uniqueid: "asterisk-0.0",
                userfield: "", peeraccount: "", linkedid: "asterisk-0.0",
                duration: 0, billsec: 0, sequence: 0,
                start: new Date("2017-01-01T08:57:57.241Z"),
                answer: new Date("1970-01-01T00:00:00Z"),
                end: new Date("2017-01-01T08:57:57.262Z"),
            }, {
                clid: "6004 <6004>", src: "6004", dst: "6003", dcontext: "context1",
                channel: "PJSIP/6004-00000000", dstchannel: "PJSIP/6003-00000001",
                lastapp: "Dial", lastdata: "PJSIP/6003", disposition: "NO ANSWER",
                amaflags: "DOCUMENTATION", accountcode: "", uniqueid: "asterisk-0.0",
                userfield: "", peeraccount: "", linkedid: "asterisk-0.0",
                duration: 0, billsec: 0, sequence: 0,
                start: new Date("2017-01-03T08:57:58.241Z"),
                answer: new Date("1970-01-03T00:00:00Z"),
                end: new Date("2017-01-03T08:57:58.262Z"),
            }];
            await ast_mongo.Cdr.remove({});
            const results = await ast_mongo.Cdr.create(data);
        });

        test ('Read them back', async () => {
            const results = await ast_mongo.Cdr
                .find()
                .sort('start')
                .select('-_id');
            expect(results).toMatchSnapshot();
        });

        test ('disconnect', async () => {
            await ast_mongo.disconnect();
        });
    });

    describe('cel', () => {
        beforeAll ( async () => {
            const data = [{
                "eventtype" : 1, "eventname" : "CHAN_START", "cid_name" : "", "cid_num" : "6002",
                "cid_ani" : "", "cid_rdnis" : "", "cid_dnid" : "", "exten" : "6001",
                "context" : "context1", "channame" : "PJSIP/6002-00000004", "appname" : "",
                "appdata" : "", "accountcode" : "", "peeraccount" : "", "uniqueid" : "asterisk-0.4",
                "linkedid" : "asterisk-0.4", "userfield" : "", "peer" : "",
                "extra" : "", "eventtime" : new Date("2017-01-01T09:12:17.629Z"),
            }, {
                "eventtype" : 5, "eventname" : "APP_START", "cid_name" : "", "cid_num" : "6002",
                "cid_ani" : "6002", "cid_rdnis" : "", "cid_dnid" : "", "exten" : "6001",
                "context" : "context1", "channame" : "PJSIP/6002-00000004", "appname" : "Dial",
                "appdata" : "PJSIP/6001", "accountcode" : "", "peeraccount" : "", "uniqueid" : "asterisk-0.4",
                "linkedid" : "asterisk-0.4", "userfield" : "", "peer" : "",
                "extra" : "", "eventtime" : new Date("2017-01-01T09:12:17.630Z"),
            }];
            await ast_mongo.connect();
            await ast_mongo.Cel.remove({});
            const results = await ast_mongo.Cel.create(data);
        });
        test ('Read log', async () => {
            const results = await ast_mongo.Cel
                .find()
                .sort('eventtime')
                .select('-_id');
            expect(results).toMatchSnapshot();
        });
    });
    test ('disconnect', async () => {
        await ast_mongo.disconnect();
    });
});
