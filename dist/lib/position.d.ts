import { BasePositionClass, BasePositionParameters } from "trade-utils";
import { oaAPIClass } from "..";
import { OANDAOrderClass } from "./order";
export interface OANDAPositionParameters extends BasePositionParameters {
    api: oaAPIClass;
}
export declare class OANDAPositionClass extends BasePositionClass {
    private _api;
    constructor(params: OANDAPositionParameters);
    private placeOrder;
    doOpen(): Promise<string>;
    doClose(): Promise<string>;
    doCancel(): Promise<void>;
    get openOrder(): OANDAOrderClass;
    get closeOrder(): OANDAOrderClass;
}
