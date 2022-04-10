import { BaseOrderSettings, BaseOrderClass } from "trade-utils";
import { BaseOrderRequest, LimitOrderRequest } from "..";
export interface OANDAOrderSettings extends BaseOrderSettings {
}
export declare class OANDAOrderClass extends BaseOrderClass {
    constructor(params: OANDAOrderSettings);
    get instrument(): string;
    get units(): number;
    get limitOrderRequest(): LimitOrderRequest;
    get request(): BaseOrderRequest;
}
