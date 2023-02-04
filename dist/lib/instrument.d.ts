import { Instrument } from "./rest/responseType";
import { InstrumentName } from "./rest/type";
import { oaAPIClass } from "./rest/api";
export declare function getInstrument(api: oaAPIClass, name: InstrumentName): Promise<Instrument>;
