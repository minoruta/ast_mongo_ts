/**
 * Property definition for Cdr
 */
import { AstProperties } from './common';

export interface CdrProperties extends AstProperties {
    clid: string;
    src: string;
    dst: string;
    dcontext: string;
    channel: string;
    dstchannel: string;
    lastapp: string;
    lastdata: string;
    disposition: string;
    amaflags: string;
    accountcode: string;
    uniqueid: string;
    userfield: string;
    peeraccount: string;
    linkedid: string;
    duration: number;
    billsec: number;
    sequence: number;
    start: Date;
    answer: Date;
    end: Date;
}
