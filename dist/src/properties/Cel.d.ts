/**
 * Property definition for Cel
 */
import { AstProperties } from './common';
export interface CelProperties extends AstProperties {
    eventtype: number;
    eventname: string;
    cid_name: string;
    cid_num: string;
    cid_ani: string;
    cid_rdnis: string;
    cid_dnid: string;
    exten: string;
    context: string;
    channame: string;
    appname: string;
    appdata: string;
    accountcode: string;
    peeraccount: string;
    uniqueid: string;
    linkedid: string;
    userfield: string;
    peer: string;
    extra: string;
    eventtime: Date;
}
