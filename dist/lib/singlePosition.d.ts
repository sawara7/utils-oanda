import { BasePositionClass, MarketInfo, OrderSide, OrderType } from "trade-utils";
import { oaAPIClass, oaBasicOrder } from "..";
import { OANDAOrderClass } from "./order";
export interface OANDASinglePositionParameters {
    marketInfo: MarketInfo;
    openSide: OrderSide;
    orderType: OrderType;
    funds: number;
    api: oaAPIClass;
    openPrice: number;
    closePrice: number;
    minOrderInterval?: number;
}
export declare class OANDASinglePosition extends BasePositionClass {
    private static _lastOrderTime?;
    private _api;
    private _minOrderInterval;
    private _marketInfo;
    private _initialSize;
    private _currentSize;
    private _openPrice;
    private _closePrice;
    private _openOrder;
    private _closeOrder;
    private _openID;
    private _closeID;
    constructor(params: OANDASinglePositionParameters);
    private static initializeLastOrderTime;
    private sleepWhileOrderInterval;
    private placeOrder;
    doOpen(): Promise<void>;
    doClose(): Promise<void>;
    updateOrder(order: oaBasicOrder): void;
    get activeID(): string;
    get enabledOpen(): boolean;
    get enabledClose(): boolean;
    get openOrder(): OANDAOrderClass;
    get closeOrder(): OANDAOrderClass;
    get currentOpenPrice(): number;
    get currentClosePrice(): number;
}
