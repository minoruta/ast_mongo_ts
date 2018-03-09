/**
 * Schema for CEL
 */
import { Schema } from "mongoose";

type Number = Schema.Types.Number;
type String = Schema.Types.String;
type Date = Schema.Types.Date;

export const CelDefinition = {
    eventtype: Number,
    eventname: String,
    cid_name: String,
    cid_num: String,
    cid_ani: String,
    cid_rdnis: String,
    cid_dnid: String,
    exten: String,
    context: String,
    channame: String,
    appname: String,
    appdata: String,
    accountcode: String,
    peeraccount: String,
    uniqueid: String,
    linkedid: String,
    userfield: String,
    peer: String,
    extra: String,
    eventtime: Date
};
