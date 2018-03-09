/**
 * Schema for CDR
 */
import { Schema } from "mongoose";

type Number = Schema.Types.Number;
type String = Schema.Types.String;
type Date = Schema.Types.Date;

export const CdrDefinition = {
    clid: String,
    src: String,
    dst: String,
    dcontext: String,
    channel: String,
    dstchannel: String,
    lastapp: String,
    lastdata: String,
    disposition: String,
    amaflags: String,
    accountcode: String,
    uniqueid: String,
    userfield: String,
    peeraccount: String,
    linkedid: String,
    duration: Number,
    billsec: Number,
    sequence: Number,
    start: Date,
    answer: Date,
    end: Date
};
